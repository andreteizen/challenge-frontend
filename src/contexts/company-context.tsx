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

/**
 * Provides the company context to its children components.
 * It manages the state of the current company, the list of companies,
 * and the loading state while fetching company data.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child components that will have access to the company context.
 * @returns {JSX.Element} The provider component that wraps its children with the company context.
 */
export function CompanyProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  const changeCompany = (company: Company) => setCompany(company);

  const getCompanies = async () => {
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_TRACTIAN_API! + '/companies';
      const response = await fetch(url);
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
