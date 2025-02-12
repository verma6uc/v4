export const handleAction = (action: string) => {
  console.log(`Action triggered: ${action}`);
};

// Helper to create action handlers
export const createHandler = (action: string) => () => {
  handleAction(action);
};