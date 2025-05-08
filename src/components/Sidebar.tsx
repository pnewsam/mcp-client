import { ChevronsUpDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { useMCPContext } from '@/contexts/MCPContext';

export default function Sidebar() {
  const { resources = [], tools = [], prompts = [] } = useMCPContext();

  return (
    <aside className="border-r border-solid border-zinc-300 p-4">
      <h1 className="text-h3 tracking-tight font-bold mb-4">
        MindsDB MCPClient
      </h1>
      <h2 className="text-2xl tracking-tight font-bold mb-2">Resources</h2>
      <div className="mb-2">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <Collapsible
              key={resource.id}
              className="border border-solid border-zinc-300 rounded-md"
            >
              <CollapsibleTrigger asChild>
                <button className="w-full text-left bg-zinc-100 p-2 rounded-md flex items-center justify-between">
                  {resource.name}
                  <ChevronsUpDown className="ml-auto" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                <p className="text-small text-zinc-500 mb-2">
                  {resource.description}
                </p>
                <pre className="bg-zinc-100 p-2 rounded-md overflow-x-auto">
                  <code className="text-zinc-800 leading-none text-[12px]">
                    {JSON.stringify(resource, null, 2)}
                  </code>
                </pre>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="border border-solid border-zinc-200 bg-zinc-100 p-2 rounded-md text-zinc-500 text-sm">
            No resources found
          </div>
        )}
      </div>

      <h2 className="text-2xl tracking-tight font-bold mb-2">Tools</h2>
      <div className="mb-4">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <Collapsible
              key={tool.name}
              className="border border-solid border-zinc-300 rounded-md"
            >
              <CollapsibleTrigger asChild>
                <button className="w-full  text-left bg-zinc-100 p-2 rounded-md flex items-center justify-between">
                  <span className="font-mono font-semibold text-[#198596]">
                    {tool.name}
                  </span>
                  <ChevronsUpDown className="w-4 h-4 ml-auto" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                <p className="text-small text-zinc-500 mb-2">
                  {tool.description}
                </p>
                <pre className="bg-zinc-100 p-2 rounded-md overflow-x-auto">
                  <code className="text-zinc-800 leading-none text-[12px]">
                    {JSON.stringify(tool, null, 2)}
                  </code>
                </pre>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="border border-solid border-zinc-200 bg-zinc-100 p-2 rounded-md text-zinc-500 text-sm">
            No tools found
          </div>
        )}
      </div>

      <h2 className="text-2xl tracking-tight font-bold mb-2">Prompts</h2>
      <div className="mb-2">
        {prompts.length > 0 ? (
          prompts.map((prompt) => (
            <Collapsible
              key={prompt.id}
              className="border border-solid border-zinc-300 rounded-md"
            >
              <CollapsibleTrigger asChild>
                <button className="w-full text-left bg-zinc-100 p-2 rounded-md flex items-center justify-between">
                  {prompt.name}
                  <ChevronsUpDown className="w-4 h-4 ml-auto" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                <p className="text-small text-zinc-500 mb-2">
                  {prompt.description}
                </p>
                <pre className="bg-zinc-100 p-2 rounded-md overflow-x-auto">
                  <code className="text-zinc-800 leading-none text-[12px]">
                    {JSON.stringify(prompt, null, 2)}
                  </code>
                </pre>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="border border-solid border-zinc-200 bg-zinc-100 p-2 rounded-md text-zinc-500 text-sm">
            No prompts found
          </div>
        )}
      </div>
    </aside>
  );
}
