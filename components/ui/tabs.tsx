import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context for sharing tab state
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Hook for accessing tabs context
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Main Tabs component
interface TabsProps {
  value: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  defaultValue,
  children,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || value);
  
  const activeTab = value || internalValue;
  const setActiveTab = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabsList component
interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

// TabsTrigger component
interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className = '',
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`${className} ${
        activeTab === value ? 'border-blue-500' : 'border-transparent'
      }`}
      role="tab"
      aria-selected={activeTab === value}
      tabIndex={0}
    >
      {children}
    </button>
  );
};

// TabsContent component
interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className = '',
}) => {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== value) return null;
  
  return (
    <div 
      role="tabpanel"
      className={className}
    >
      {children}
    </div>
  );
};