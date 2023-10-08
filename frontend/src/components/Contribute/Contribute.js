import React from "react";

export function Contribute() {
  // You can define your teamMembers and description directly here or fetch them from some source.


  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      description: "Passionate about creating amazing web experiences.",
      imageUrl: "https://example.com/john-doe.jpg",
      socialLinks: {
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
      },
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      description: "Expert in building scalable and secure server-side applications.",
      imageUrl: "https://scontent.fmaa8-1.fna.fbcdn.net/v/t39.30808-1/345440615_9990688987623061_276568383313508978_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeFLyu5K_cLixwVQuMET0CRTkMu2dTidyvSQy7Z1OJ3K9G334eNL7Pow1fF860tl-Fx7HkgNANM5DXgUA-fQoCut&_nc_ohc=fv7Yijs014QAX_ZvJKY&_nc_ht=scontent.fmaa8-1.fna&oh=00_AfD9ZinRm9nbYiSjJDH4GXyQcMFCRDUU3jyGR9ZG9YQWCg&oe=650B9D30",
      socialLinks: {
        github: "https://github.com/janesmith",
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
      },
    },
    {
        name: "Anuradha Wickramasinghe",
        role: "full Stack Developer ",
        description: "Expert in building scalable and secure server-side applications.",
        imageUrl: "https://scontent.fmaa8-1.fna.fbcdn.net/v/t39.30808-1/345440615_9990688987623061_276568383313508978_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeFLyu5K_cLixwVQuMET0CRTkMu2dTidyvSQy7Z1OJ3K9G334eNL7Pow1fF860tl-Fx7HkgNANM5DXgUA-fQoCut&_nc_ohc=fv7Yijs014QAX_ZvJKY&_nc_ht=scontent.fmaa8-1.fna&oh=00_AfD9ZinRm9nbYiSjJDH4GXyQcMFCRDUU3jyGR9ZG9YQWCg&oe=650B9D30",
        socialLinks: {
          github: "https://github.com/janesmith",
          twitter: "https://twitter.com/janesmith",
          linkedin: "https://linkedin.com/in/janesmith",
        },
      },
  ];


    const description = "Meet our awesome team!";

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
            OUR TEAM{" "}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="p-4 lg:w-1/3 md:w-1/4">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt={member.name}
                  className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                  src={member.imageUrl}
                />
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    {member.name}
                  </h2>
                  <h3 className="text-gray-500 mb-3">{member.role}</h3>
                  <p className="mb-4">{member.description}</p>
                  <span className="inline-flex">
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gray-500"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gray-500"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contribute;
