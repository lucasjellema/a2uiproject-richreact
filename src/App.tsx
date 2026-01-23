import { useState } from 'react';
import { useA2uiProcessor, Surface } from '@a2ui-bridge/react';
import { mantineComponents } from '@a2ui-bridge/react-mantine';
import type { UserAction } from '@a2ui-bridge/core';
import { Textarea, Button } from '@mantine/core';
import { generateUIFromPrompt } from './geminiService';
import './App.css';

function App() {
  const processor = useA2uiProcessor();
  const [aiInput, setAiInput] = useState('');
  const [loading, setLoading] = useState(false);

  const examples = [
    { label: '👋 Hello Button', prompt: 'A button that says Hello World' },
    { label: '📝 Login Form', prompt: 'Create a login form with username and password fields and a submit button' },
    { label: '📋 Registration Form', prompt: 'A registration form with email, password, and confirm password fields arranged vertically' },
    { label: '👤 User Card', prompt: 'A card with a user profile containing a title and description' },
  ];

  const handleExampleClick = (prompt: string) => {
    setAiInput(prompt);
  };

  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;

    setLoading(true);
    try {
      const messages = await generateUIFromPrompt(aiInput);
      
      processor.processMessages([{ deleteSurface: { surfaceId: '@default' } }]);
      processor.processMessages(messages);
      console.log('Generated UI:', messages);
    } catch (error) {
      console.error('Error generating UI:', error);
      alert('Failed to generate UI. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action: UserAction) => {
    console.log('Action received:', action);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        
        <div className="info-box">
          <h3>How to Use</h3>
          <p>Describe the UI you want to create in natural language. The AI will generate it for you!</p>
        </div>

        <div className="sidebar-content">
          <Textarea
            placeholder="E.g., Create a login form with username and password fields and a submit button"
            value={aiInput}
            onChange={(event) => setAiInput(event.currentTarget.value)}
            minRows={6}
            autosize
            maxRows={12}
            styles={{
              input: {
                fontSize: '0.95rem',
                lineHeight: 1.6
              }
            }}
          />
          
          <Button 
            onClick={handleAiSubmit} 
            loading={loading}
            disabled={!aiInput.trim() || loading}
            size="lg"
            fullWidth
            gradient={{ from: '#667eea', to: '#764ba2', deg: 135 }}
            variant="gradient"
          >
            {loading ? 'Generating...' : 'Generate UI'}
          </Button>

          <div className="examples-section">
            <h3>Quick Examples</h3>
            <div className="examples-grid">
              {examples.map((example, index) => (
                <button
                  key={index}
                  className="example-button"
                  onClick={() => handleExampleClick(example.prompt)}
                  disabled={loading}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="main-content-inner">
          <Surface
            processor={processor}
            components={mantineComponents}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;