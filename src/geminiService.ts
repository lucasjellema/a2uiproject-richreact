import { GoogleGenAI } from '@google/genai';
import type { ServerToClientMessage } from '@a2ui-bridge/core';

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

export async function generateUIFromPrompt(prompt: string): Promise<ServerToClientMessage[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [{
          text: `You are a UI generator. Create A2UI Bridge JSON messages based on the user's request.

IMPORTANT: Return ONLY a valid JSON array with no markdown formatting, no code blocks, no explanations.

Structure:
[
  {
    "beginRendering": {
      "surfaceId": "@default",
      "root": "root-component-id"
    }
  },
  {
    "surfaceUpdate": {
      "surfaceId": "@default",
      "components": [
        {
          "id": "unique-id",
          "component": {
            "ComponentType": { /* properties */ }
          }
        }
      ]
    }
  }
]

Available Components:
1. Button: { "Button": { "child": "text-id", "action": { "submitAction": { "actionType": "button-action" } } } }
2. Text: { "Text": { "text": { "literalString": "Display text here" } } }
3. TextField: { "TextField": { "label": { "literalString": "Field Label" }, "text": { "literalString": "" } } }
4. Column: { "Column": { "children": ["child-id-1", "child-id-2"] } }
5. Row: { "Row": { "children": ["child-id-1", "child-id-2"] } }
6. Checkbox: { "Checkbox": { "label": { "literalString": "Checkbox Label" }, "checked": false } }
7. Select: { "Select": { "label": { "literalString": "Select Label" }, "data": [{ "value": "option1", "label": "Option 1" }], "placeholder": { "literalString": "Choose an option" } } }
8. DatePicker: { "DatePicker": { "label": { "literalString": "Date Label" }, "placeholder": { "literalString": "Pick a date" } } }
9. Card: { "Card": { "children": ["child-id-1", "child-id-2"] } }
10. Tabs: { "Tabs": { "defaultValue": "tab1", "children": ["tab-1-id", "tab-2-id"] } }
11. TabsList: { "TabsList": { "children": ["tab-trigger-1", "tab-trigger-2"] } }
12. TabsTrigger: { "TabsTrigger": { "value": "tab1", "child": "tab-label-id" } }
13. TabsPanel: { "TabsPanel": { "value": "tab1", "children": ["content-id-1"] } }
14. Modal: { "Modal": { "opened": false, "title": { "literalString": "Modal Title" }, "children": ["modal-content-id"] } }

Example for a button:
[
  { "beginRendering": { "surfaceId": "@default", "root": "my-button" } },
  {
    "surfaceUpdate": {
      "surfaceId": "@default",
      "components": [
        {
          "id": "my-button",
          "component": {
            "Button": {
              "child": "button-label",
              "action": { "submitAction": { "actionType": "click-action" } }
            }
          }
        },
        {
          "id": "button-label",
          "component": {
            "Text": { "text": { "literalString": "Click Me" } }
          }
        }
      ]
    }
  }
]

User request: ${prompt}

Return ONLY the JSON array, no markdown:`
        }]
      }
    ],
  });

  if (!response.text) {
    throw new Error('No response text received from Gemini API');
  }

  let content = response.text.trim();
  
  content = content.replace(/^```json\s*/gm, '');
  content = content.replace(/^```\s*/gm, '');
  content = content.replace(/```$/gm, '');
  content = content.trim();
  
  const messages = JSON.parse(content) as ServerToClientMessage[];
  
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid response: Expected non-empty array');
  }
  
  return messages;
}
