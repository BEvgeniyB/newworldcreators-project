import { useState } from 'react';

const API_URL = 'https://functions.poehali.dev/ec72bbed-cfa0-4561-8e43-5fe96626422b';

interface UseChakraActionsProps {
  token: string | null;
  selectedUserId: number | null;
  users: any[];
  concepts: any[];
  organs: any[];
  sciences: any[];
  responsibilities: any[];
  basicNeeds: any[];
  allConcepts: any[];
  allOrgans: any[];
  allSciences: any[];
  allResponsibilities: any[];
  allBasicNeeds: any[];
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
  loadAllData: () => Promise<void>;
  loadUserData: (userId: number) => Promise<void>;
  dialogState: any;
  setDialogState: any;
}

export const useChakraActions = ({
  token,
  selectedUserId,
  authFetch,
  loadAllData,
  loadUserData,
  dialogState,
  setDialogState,
}: UseChakraActionsProps) => {
  const [showNewConceptForm, setShowNewConceptForm] = useState(false);
  const [selectedExistingConceptId, setSelectedExistingConceptId] = useState<number | null>(null);
  const [showNewOrganForm, setShowNewOrganForm] = useState(false);
  const [selectedExistingOrganId, setSelectedExistingOrganId] = useState<number | null>(null);
  const [showNewScienceForm, setShowNewScienceForm] = useState(false);
  const [selectedExistingScienceId, setSelectedExistingScienceId] = useState<number | null>(null);
  const [showNewResponsibilityForm, setShowNewResponsibilityForm] = useState(false);
  const [selectedExistingResponsibilityId, setSelectedExistingResponsibilityId] = useState<number | null>(null);

  const handleCreate = (type: string) => {
    setDialogState({
      open: true,
      type,
      mode: 'create',
      item: null,
    });
  };

  const handleEdit = (type: string, item: any) => {
    setDialogState({
      open: true,
      type,
      mode: 'edit',
      item,
    });
  };

  const handleDelete = async (type: string, id: number) => {
    if (!token || !confirm('Удалить запись?')) return;

    const tableMap: Record<string, string> = {
      concept: 'chakra_concepts',
      organ: 'chakra_organs',
      science: 'chakra_sciences',
      responsibility: 'chakra_responsibilities',
      basic_need: 'chakra_basic_needs',
      user: 'users',
    };

    try {
      const response = await authFetch(`${API_URL}?table=${tableMap[type]}&id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (selectedUserId) {
          await loadUserData(selectedUserId);
        }
        await loadAllData();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleSave = async () => {
    if (!token || !selectedUserId) return;

    const { type, mode, item } = dialogState;
    const tableMap: Record<string, string> = {
      concept: 'chakra_concepts',
      organ: 'chakra_organs',
      science: 'chakra_sciences',
      responsibility: 'chakra_responsibilities',
      basic_need: 'chakra_basic_needs',
      user: 'users',
    };

    try {
      const method = mode === 'create' ? 'POST' : 'PUT';
      const url = mode === 'create' ? `${API_URL}?table=${tableMap[type]}` : `${API_URL}?table=${tableMap[type]}&id=${item.id}`;

      const body: any = { ...item };
      if (mode === 'create' && type !== 'user') {
        body.user_id = selectedUserId;
      }

      const response = await authFetch(url, {
        method,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setDialogState({ ...dialogState, open: false });
        if (selectedUserId) {
          await loadUserData(selectedUserId);
        }
        await loadAllData();
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleCreateUser = () => {
    handleCreate('user');
  };

  const handleEditUser = (user: any) => {
    handleEdit('user', user);
  };

  return {
    showNewConceptForm,
    setShowNewConceptForm,
    selectedExistingConceptId,
    setSelectedExistingConceptId,
    showNewOrganForm,
    setShowNewOrganForm,
    selectedExistingOrganId,
    setSelectedExistingOrganId,
    showNewScienceForm,
    setShowNewScienceForm,
    selectedExistingScienceId,
    setSelectedExistingScienceId,
    showNewResponsibilityForm,
    setShowNewResponsibilityForm,
    selectedExistingResponsibilityId,
    setSelectedExistingResponsibilityId,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
    handleCreateUser,
    handleEditUser,
  };
};
