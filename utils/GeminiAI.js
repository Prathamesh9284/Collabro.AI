// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// const prompt = `Your role is to act as a task management assistant for project planning. Based on the user's input, I need you to generate a JSON structure for a Kanban board. This structure should include specific tasks categorized into columns with the statuses: "Not Started", "In Progress", "Completed", and "On Hold". Ensure that the tasks are relevant to the project details provided by the user.

// Here is the structure I need. Return the valid JSON only without any extra commentary:
// {
//     "columns": [
//         { "id": "not_started", "title": "Not Started" },
//         { "id": "in_progress", "title": "In Progress" },
//         { "id": "completed", "title": "Completed" },
//         { "id": "on_hold", "title": "On Hold" }
//     ],
//     "tasks": [
//         { "id": "1", "columnId": "not_started", "content": "Define project scope and objectives" },
//         { "id": "2", "columnId": "in_progress", "content": "Develop wireframes for the UI" },
//         { "id": "3", "columnId": "completed", "content": "Complete initial stakeholder meeting" },
//         { "id": "4", "columnId": "on_hold", "content": "Set up production server environment" }
//     ]
// }

// Remember to use the user's input to generate relevant tasks and populate the columns accordingly.
// above is Jost the example but structure should be generated based on user input.
// Only return the JSON structure. Do not include any other text or comments.`;


// async function GeminiAI() {
//   try {
//     const result = await model.generateContent(prompt);
//     const response = result.response;

//     if (response.status !== 200) {
//       throw new Error(`Failed to generate content: ${response.statusText}`);
//     }

//     return response.data;
//   } catch (error) {
//     // Handle error here (e.g., return null, log the error)
//     console.error("Error generating treatment plan:", error);
//     return null; // Replace with appropriate error handling
//   }
// }

// // Usage example
// GeminiAI()
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// export default GeminiAI;


// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// async function getTaskStatus(taskDetails) {
//   const prompt = `Your role is to act as a task management assistant for project planning. Based on the user's input, generate a JSON structure for a Kanban board based on the following task details:
//   ${JSON.stringify(taskDetails)}

//   Only return the JSON structure. Do not include any other text or comments.`;

//   try {
//     const result = await model.generateContent(prompt, generationConfig);
//     const response = JSON.parse(result.output);

//     console.log("GeminiAI.getTaskStatus response:", response);
//     return response; // Ensure the response has the expected structure
//   } catch (error) {
//     console.error("Error in GeminiAI.getTaskStatus:", error);
//     throw new Error("Failed to fetch task status from GeminiAI.");
//   }
// }

// export default { getTaskStatus };



import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

/**
 * Generates a prompt dynamically based on user's task details.
 * Only returns the JSON structure. 
 */
function buildPrompt(taskDetails) {
  return `
Your role is to act as a task management assistant for project planning. 
Based on the user's input, generate a JSON structure for tasks 
with columns: "Not Started", "In Progress", "Completed", and "On Hold".

User's Input:
Task Name: ${taskDetails.name}
Description: ${taskDetails.description}
Days to Go: ${taskDetails.daysToGo}
Priority: ${taskDetails.priority}
Assignee: ${taskDetails.assignee}

Return valid JSON only, with columns and tasks. No extra comments.no preamble text.
`;
}

/**
 * getTaskStatus tries to parse the AI's JSON and returns the first task's column ID as the "status".
 * Modify this logic as needed for your use case.
 */
async function getTaskStatus(taskDetails) {
  try {
    console.log("Generating task status with details:", taskDetails);
    const prompt = buildPrompt(taskDetails);

    console.log("Prompt:", prompt);

    const result = await model.generateContent(prompt);

    console.log("GeminiAI.getTaskStatus result:", result);

    // Check if the request was successful
    // if (!result || !result.response || result.response.status !== 200) {
    //   throw new Error(
    //     `Failed to generate content: ${
    //       result?.response?.statusText || "No response from model"
    //     }`
    //   );
    // }

    console.log("Parsed JSON from AI response:", JSON.parse(result.response.data));

    // Parse JSON from model output
    let data;
    try {
      data = JSON.parse(result.response.data);
    } catch (parseError) {
      console.error("Failed to parse JSON from AI response:", parseError);
      return null;
    }

    // Example: let's return the status of the first task
    if (data && data.tasks && data.tasks.length > 0) {
      // Expect something like "not_started" => your code can map that to "not-started"
      return { status: data.tasks[0].columnId || "no_tasks_found" };
    }

    return { status: "no_tasks_found" }; // Indicate no tasks found
  } catch (error) {
    console.error("Error generating task status:", error);
    return null;
  }
}

export default { getTaskStatus };