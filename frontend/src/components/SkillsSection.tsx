import React, { useEffect, useState } from 'react';

interface Skill {
  name: string;
  iconUrl: string;
}

const skills: Skill[] = [
  { name: 'React', iconUrl: 'https://picsum.photos/seed/react/80' },
  { name: 'TypeScript', iconUrl: 'https://picsum.photos/seed/typescript/80' },
  { name: 'Node.js', iconUrl: 'https://picsum.photos/seed/nodejs/80' },
  { name: 'Cybersecurity', iconUrl: 'https://picsum.photos/seed/cybersecurity/80' },
  { name: 'Ethical Hacking', iconUrl: 'https://picsum.photos/seed/ethical-hacking/80' },
  { name: 'Network Security', iconUrl: 'https://picsum.photos/seed/network-security/80' },
];

const SkillsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="py-10 px-4 bg-[#1E1E1E]">
      <div className="container mx-auto">
        <h2 className="text-[32px] font-mono text-[#66FF66] mb-8">
          Skills
        </h2>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-700 ease-out transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center justify-center p-4 rounded border border-gray-700 hover:border-[#66FF66] shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={skill.iconUrl}
                alt={skill.name}
                className="w-20 h-20 rounded-full mb-2"
              />
              <span className="text-[18px] font-sans text-[#FFFFFF]">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;