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
  const [concepts, setConcepts] = useState<Record<string, unknown>[]>([]);
  const [organs, setOrgans] = useState<Record<string, unknown>[]>([]);
  const [sciences, setSciences] = useState<Record<string, unknown>[]>([]);
  const [responsibilities, setResponsibilities] = useState<Record<string, unknown>[]>([]);
  const [basicNeeds, setBasicNeeds] = useState<Record<string, unknown>[]>([]);
  const [allConcepts, setAllConcepts] = useState<Record<string, unknown>[]>([]);
  const [allOrgans, setAllOrgans] = useState<Record<string, unknown>[]>([]);
  const [allSciences, setAllSciences] = useState<Record<string, unknown>[]>([]);
  const [allResponsibilities, setAllResponsibilities] = useState<Record<string, unknown>[]>([]);
  const [allBasicNeeds, setAllBasicNeeds] = useState<Record<string, unknown>[]>([]);
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

      setUsers(usersData.users || usersData.data || []);
      setChakras(chakrasData.chakras || chakrasData.data || []);
      setAllConcepts(conceptsData.chakra_concepts || conceptsData.data || []);
      setAllOrgans(organsData.chakra_organs || organsData.data || []);
      setAllSciences(sciencesData.chakra_sciences || sciencesData.data || []);
      setAllResponsibilities(responsibilitiesData.chakra_responsibilities || responsibilitiesData.data || []);
      setAllBasicNeeds(needsData.chakra_basic_needs || needsData.data || []);
    } catch (error) {
      console.error('Error loading all data:', error);
    }
  }, [token, authFetch]);

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

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

        setConcepts(conceptsData.chakra_concepts || conceptsData.data || []);
        setOrgans(organsData.chakra_organs || organsData.data || []);
        setSciences(sciencesData.chakra_sciences || sciencesData.data || []);
        setResponsibilities(responsibilitiesData.chakra_responsibilities || responsibilitiesData.data || []);
        setBasicNeeds(needsData.chakra_basic_needs || needsData.data || []);
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