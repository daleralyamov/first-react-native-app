import { createContext, PropsWithChildren, useState } from "react";

type AppLockState = {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
};

export const AppLockContext = createContext<AppLockState>({
  isLocked: true,
  lock: () => {},
  unlock: () => {}
});

export function AppLockProvider({ children }: PropsWithChildren) {
  const [isLocked, setIsLocked] = useState(true);

  const lock = () => {
    setIsLocked(true);
  };

  const unlock = () => {
    setIsLocked(false);
  };

  return (
    <AppLockContext.Provider value={{ isLocked, lock, unlock }}>{children}</AppLockContext.Provider>
  );
}
