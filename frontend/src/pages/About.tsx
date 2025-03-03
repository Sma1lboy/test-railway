import React, { useEffect } from 'react';
import SkillsSection from '../components/SkillsSection';
import { useUserContext } from '../contexts/UserContext';

const About: React.FC = () => {
  const { currentUser, fetchUserById } = useUserContext();

  useEffect(() => {
    // Fetch the website owner's profile (Assuming UserID 1 is the owner)
    fetchUserById(1);
  }, [fetchUserById]);

  return (
    <main className="min-h-screen bg-[#1E1E1E] text-[#FFFFFF] transition-all duration-500">
      <div className="max-w-5xl mx-auto p-4">
        {/* Personal Introduction Section */}
        <section className="flex flex-col md:flex-row items-center mb-10">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src="https://picsum.photos/200/200"
              alt="Profile"
              className="rounded-full shadow-lg border-4 border-[#66FF66]"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-[32px] font-mono text-[#66FF66] mb-4">About Me</h1>
            <p className="text-[18px] font-sans leading-relaxed">
              {currentUser ? (
                <>
                  Hi, I'm {currentUser.Name}. {currentUser.Bio}
                </>
              ) : (
                <>
                  Hello! I'm a passionate cybersecurity enthusiast and dedicated blogger with a keen interest in ethical hacking and network security. I explore the digital world, uncover vulnerabilities, and share my insights to help you stay safe in this ever-evolving cyber landscape.
                </>
              )}
            </p>
            {currentUser && currentUser.SocialMediaLinks && (
              <div className="mt-4">
                <a
                  href={currentUser.SocialMediaLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#66FF66] text-[#FFFFFF] rounded-full py-2 px-4 hover:bg-[#5ae65a] transition-colors duration-300"
                >
                  Connect with me
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <SkillsSection />
      </div>
    </main>
  );
};

export default About;