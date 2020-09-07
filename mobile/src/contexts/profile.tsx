import React, { createContext, useState, useContext } from 'react';

interface IProfileContext {
  profile: string | "Helper" | "Helped";
  setProfile: Function;
}

const ProfileContext = createContext<IProfileContext>({ profile: "", setProfile: () => {} });

const ProfileProvider: React.FC = ({children}) => {
  const [profile, setProfile] = useState<string>("")

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}> 
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider

export function useProfile() {
  const context = useContext<IProfileContext>(ProfileContext);
  const { profile, setProfile } = context;
  return { profile, setProfile };
}