'use client';

import { CompanyIcon } from '@public/icons';
import Logo from '@public/logo.png';
import { useCompany } from '@/contexts/company-context';
import { Button } from '../ui/buttons';
import Image from 'next/image';

export default function Navbar() {
  const { companies, changeCompany, company: activeCompany } = useCompany();

  return (
    <nav className="bg-backgroundNavbar text-white">
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col sm:flex-row md:justify-between md:h-12 p-4 justify-center items-center gap-4 h-fit">
        <Image alt="Logo" className="logo" width={100} height={14} src={Logo} />
        <div className="flex space-x-3 w-fit">
          {companies?.map((company, index) => (
            <Button
              key={index}
              {...(activeCompany && {
                active: company.id === activeCompany.id,
              })}
              onClick={() => changeCompany(company)}
              icon={<CompanyIcon />}
            >
              {company.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
