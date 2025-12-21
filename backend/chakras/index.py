import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime, date

def json_serial(obj):
    """JSON serializer for datetime objects"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с системой чакр - получение списка, детальной информации и обновление
    Args: event с httpMethod, body, queryStringParameters, headers
          context с request_id
    Returns: HTTP response с данными чакр
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            chakra_id = params.get('id')
            
            if chakra_id:
                result = get_chakra_detail(cur, chakra_id)
            else:
                result = get_all_chakras(cur)
            
            cur.close()
            conn.close()
            return result
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            chakra_id = body.get('id')
            user_role = event.get('headers', {}).get('X-User-Role', 'viewer')
            user_id = event.get('headers', {}).get('X-User-Id')
            
            if user_role not in ['admin', 'responsible']:
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Insufficient permissions'}),
                    'isBase64Encoded': False
                }
            
            result = update_chakra(cur, conn, chakra_id, body, user_id)
            cur.close()
            conn.close()
            return result
        
        cur.close()
        conn.close()
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def get_all_chakras(cur) -> Dict[str, Any]:
    query = '''
        SELECT 
            c.id, c.name, c.position, c.color, c.symbol_url,
            c.continent, c.right_statement, c.status,
            u.name as responsible_name
        FROM t_p91912798_newworldcreators_pro.chakras c
        LEFT JOIN t_p91912798_newworldcreators_pro.users u ON c.responsible_user_id = u.id
        ORDER BY c.position
    '''
    cur.execute(query)
    chakras = cur.fetchall()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'chakras': [dict(ch) for ch in chakras]}, ensure_ascii=False, default=json_serial),
        'isBase64Encoded': False
    }

def get_chakra_detail(cur, chakra_id: str) -> Dict[str, Any]:
    schema = 't_p91912798_newworldcreators_pro'
    try:
        safe_id = str(int(chakra_id))
    except (ValueError, TypeError):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid chakra ID'}),
            'isBase64Encoded': False
        }
    
    query = f"""
        SELECT 
            c.*,
            u.name as responsible_name,
            u.email as responsible_email
        FROM {schema}.chakras c
        LEFT JOIN {schema}.users u ON c.responsible_user_id = u.id
        WHERE c.id = {safe_id}
    """
    cur.execute(query)
    
    chakra = cur.fetchone()
    if not chakra:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Chakra not found'}),
            'isBase64Encoded': False
        }
    
    chakra_dict = dict(chakra)
    
    cur.execute(f'''
        SELECT cc.concept, cc.category, cc.user_id, u.name as user_name
        FROM {schema}.chakra_concepts cc
        LEFT JOIN {schema}.users u ON cc.user_id = u.id
        WHERE cc.chakra_id = {safe_id}
    ''')
    chakra_dict['concepts'] = [dict(c) for c in cur.fetchall()]
    
    cur.execute(f'''
        SELECT co.organ_name, co.description, co.user_id, u.name as user_name
        FROM {schema}.chakra_organs co
        LEFT JOIN {schema}.users u ON co.user_id = u.id
        WHERE co.chakra_id = {safe_id}
    ''')
    chakra_dict['organs'] = [dict(o) for o in cur.fetchall()]
    
    cur.execute(f'''
        SELECT cs.science_name, cs.description, cs.user_id, u.name as user_name
        FROM {schema}.chakra_sciences cs
        LEFT JOIN {schema}.users u ON cs.user_id = u.id
        WHERE cs.chakra_id = {safe_id}
    ''')
    chakra_dict['sciences'] = [dict(s) for s in cur.fetchall()]
    
    cur.execute(f'''
        SELECT cr.responsibility, cr.category, cr.user_id, u.name as user_name
        FROM {schema}.chakra_responsibilities cr
        LEFT JOIN {schema}.users u ON cr.user_id = u.id
        WHERE cr.chakra_id = {safe_id}
    ''')
    chakra_dict['responsibilities'] = [dict(r) for r in cur.fetchall()]
    
    cur.execute(f'''
        SELECT cbn.id, cbn.basic_need, cbn.description, cbn.user_id, u.name as user_name
        FROM {schema}.chakra_basic_needs cbn
        LEFT JOIN {schema}.users u ON cbn.user_id = u.id
        WHERE cbn.chakra_id = {safe_id}
    ''')
    chakra_dict['basic_needs'] = [dict(bn) for bn in cur.fetchall()]
    
    cur.execute(f'''
        SELECT cq.question, cq.is_resolved, cq.user_id, u.name as user_name
        FROM {schema}.chakra_questions cq
        LEFT JOIN {schema}.users u ON cq.user_id = u.id
        WHERE cq.chakra_id = {safe_id}
    ''')
    chakra_dict['questions'] = [dict(q) for q in cur.fetchall()]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'chakra': chakra_dict}, ensure_ascii=False, default=json_serial),
        'isBase64Encoded': False
    }

def update_chakra(cur, conn, chakra_id: str, data: Dict, user_id: str) -> Dict[str, Any]:
    updates = []
    values = []
    
    allowed_fields = ['name', 'color', 'continent', 'right_statement', 'status', 'symbol_url']
    
    for field in allowed_fields:
        if field in data:
            updates.append(f"{field} = %s")
            values.append(data[field])
    
    if not updates:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'No fields to update'}),
            'isBase64Encoded': False
        }
    
    values.append(chakra_id)
    query = f"UPDATE t_p91912798_newworldcreators_pro.chakras SET {', '.join(updates)}, updated_at = CURRENT_TIMESTAMP WHERE id = %s"
    
    cur.execute(query, values)
    conn.commit()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Chakra updated'}),
        'isBase64Encoded': False
    }