'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Company {
  id: string;
  name: string;
}

interface CompanyContextType {
  company: Company | null;
  changeCompany: (company: Company) => void;
  companies: Company[];
  loading: boolean;
}

const CompanyContext = createContext({} as CompanyContextType);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  const changeCompany = (company: Company) => setCompany(company);

  const getCompanies = async () => {
    setLoading(true);
    try {
      console.log('ENTROU NO GET COMPANIES');
      const url = process.env.NEXT_PUBLIC_TRACTIAN_API! + '/companies';
      console.log('URL: ', url);
      const response = await fetch(url);
      console.log('RESPONSE: ', response);
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        company,
        changeCompany,
        companies,
        loading,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => useContext(CompanyContext);
