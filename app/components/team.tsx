import { teamMembers } from "../../content/team";

const Team = () => (
  <div className="flex justify-center w-full py-20 md:py-24">
    <div className="w-full max-w-7xl">
      <h2 className="text-sm font-bold uppercase tracking-wide text-primary mb-8">
        Meet the team
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 justify-start md:justify-center">
        {teamMembers.map((member) => (
          <figure
            key={member.name + member.role}
            className="flex items-center justify-center"
          >
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative">
                <img
                  src={member.image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/avatar.png";
                  }}
                  width="120"
                  height="120"
                  className="w-28 h-28 object-cover rounded-full"
                  alt={member.name}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-primary/30 rounded-full"></div>
              </div>
            </div>
            <figcaption className="flex-1 pl-8 flex flex-col justify-center items-start">
              <h2 className="text-lg font-semibold mb-1">{member.name}</h2>
              <p className="text-sm mb-2">{member.role}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-muted-foreground/35 hover:text-primary transition-colors mt-1"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                    />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </div>
);

export default Team;
