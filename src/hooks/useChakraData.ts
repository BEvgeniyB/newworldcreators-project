import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://functions.poehali.dev/ec72bbed-cfa0-4561-8e43-5fe96626422b';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_admin: boolean;
  telegram_id: string;
  telegram_username?: string;
  chakra_id?: number;
}

interface Chakra {
  id: number;
  name: string;
  position: number;
  color: string;
}

export const useChakraData = (token: string | null, selectedUserId: number | null) => {
  const [users, setUsers] = useState<User[]>([]);
  const [chakras, setChakras] = useState<Chakra[]>([]);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [organs, setOrgans] = useState<any[]>([]);
  const [sciences, setSciences] = useState<any[]>([]);
  const [responsibilities, setResponsibilities] = useState<any[]>([]);
  const [basicNeeds, setBasicNeeds] = useState<any[]>([]);
  const [allConcepts, setAllConcepts] = useState<any[]>([]);
  const [allOrgans, setAllOrgans] = useState<any[]>([]);
  const [allSciences, setAllSciences] = useState<any[]>([]);
  const [allResponsibilities, setAllResponsibilities] = useState<any[]>([]);
  const [allBasicNeeds, setAllBasicNeeds] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (!token) throw new Error('No token');
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'X-Auth-Token': token,
          'Content-Type': 'application/json',
        },
      });
    },
    [token]
  );

  const loadAllData = useCallback(async () => {
    if (!token) return;
    try {
      const [usersRes, chakrasRes, conceptsRes, organsRes, sciencesRes, responsibilitiesRes, needsRes] = await Promise.all([
        authFetch(`${API_URL}?table=users`),
        authFetch(`${API_URL}?table=chakras`),
        authFetch(`${API_URL}?table=chakra_concepts`),
        authFetch(`${API_URL}?table=chakra_organs`),
        authFetch(`${API_URL}?table=chakra_sciences`),
        authFetch(`${API_URL}?table=chakra_responsibilities`),
        authFetch(`${API_URL}?table=chakra_basic_needs`),
      ]);

      const usersData = await usersRes.json();
      const chakrasData = await chakrasRes.json();
      const conceptsData = await conceptsRes.json();
      const organsData = await organsRes.json();
      const sciencesData = await sciencesRes.json();
      const responsibilitiesData = await responsibilitiesRes.json();
      const needsData = await needsRes.json();

      setUsers(usersData.data || []);
      setChakras(chakrasData.data || []);
      setAllConcepts(conceptsData.data || []);
      setAllOrgans(organsData.data || []);
      setAllSciences(sciencesData.data || []);
      setAllResponsibilities(responsibilitiesData.data || []);
      setAllBasicNeeds(needsData.data || []);
    } catch (error) {
      console.error('Error loading all data:', error);
    }
  }, [token, authFetch]);

  const loadUserData = useCallback(
    async (userId: number) => {
      if (!token) return;
      try {
        const [conceptsRes, organsRes, sciencesRes, responsibilitiesRes, needsRes] = await Promise.all([
          authFetch(`${API_URL}?table=chakra_concepts&user_id=${userId}`),
          authFetch(`${API_URL}?table=chakra_organs&user_id=${userId}`),
          authFetch(`${API_URL}?table=chakra_sciences&user_id=${userId}`),
          authFetch(`${API_URL}?table=chakra_responsibilities&user_id=${userId}`),
          authFetch(`${API_URL}?table=chakra_basic_needs&user_id=${userId}`),
        ]);

        const conceptsData = await conceptsRes.json();
        const organsData = await organsRes.json();
        const sciencesData = await sciencesRes.json();
        const responsibilitiesData = await responsibilitiesRes.json();
        const needsData = await needsRes.json();

        setConcepts(conceptsData.data || []);
        setOrgans(organsData.data || []);
        setSciences(sciencesData.data || []);
        setResponsibilities(responsibilitiesData.data || []);
        setBasicNeeds(needsData.data || []);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    },
    [token, authFetch]
  );



  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u.id === selectedUserId);
      setSelectedUser(user || null);
      loadUserData(selectedUserId);
    } else {
      setSelectedUser(null);
      setConcepts([]);
      setOrgans([]);
      setSciences([]);
      setResponsibilities([]);
      setBasicNeeds([]);
    }
  }, [selectedUserId, users, loadUserData]);

  return {
    users,
    chakras,
    concepts,
    organs,
    sciences,
    responsibilities,
    basicNeeds,
    allConcepts,
    allOrgans,
    allSciences,
    allResponsibilities,
    allBasicNeeds,
    selectedUser,
    authFetch,
    loadAllData,
    loadUserData,
  };
};