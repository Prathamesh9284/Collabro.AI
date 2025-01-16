import { useUser } from "@clerk/nextjs";

const useGeneratePrompt = () => {
  const { user } = useUser();

  return `Hello ${user?.firstName || 'User'} ${user?.lastName || ''},

    Welcome to the Indian Constitution Assistant. I am here to provide you with comprehensive and accurate information about the Indian Constitution.

    You can ask about:
    - The Preamble and its significance
    - Fundamental Rights, Duties, and Directive Principles
    - The structure and functions of the Executive, Legislature, and Judiciary
    - Important amendments, including the 42nd and 44th amendments
    - Key articles like Article 21 (Right to Life), Article 32 (Right to Constitutional Remedies), and more
    - The roles of various constitutional bodies like the Election Commission, Comptroller and Auditor General, etc.
    - The federal structure and division of powers between the Centre and the States
    - The emergency provisions under the Constitution
    - Historical context and framing of the Constitution by the Constituent Assembly

    Note: If you have any other queries that are not directly related to the Indian Constitution, I will gently remind you that this assistant is focused solely on constitutional matters.
    
    How can I assist you today with the Indian Constitution?`;
};

export default useGeneratePrompt;