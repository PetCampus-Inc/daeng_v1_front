export type IconProps = {
  borderStyle?: string;
};

const HomelessDogIcon = ({ borderStyle = "" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      style={{ borderRadius: `${borderStyle}` }}
    >
      <rect width="24" height="24" fill="#FFF7E1" rx="8" />
      <path
        fill="#956F4C"
        fillRule="evenodd"
        d="M16.642 5.875H7.358l-.489 5.25h10.262l-.49-5.25ZM7.358 5a.872.872 0 0 0-.865.793l-.49 5.25A.873.873 0 0 0 6.87 12h10.262a.873.873 0 0 0 .865-.957l-.489-5.25A.871.871 0 0 0 16.642 5H7.358Z"
        clipRule="evenodd"
      />
      <path
        fill="#956F4C"
        d="M5 11.778C5 10.796 5.784 10 6.75 10h10.5c.966 0 1.75.796 1.75 1.778v4.444c0 .982-.784 1.778-1.75 1.778H6.75C5.784 18 5 17.204 5 16.222v-4.444Z"
      />
      <path
        fill="#FFCD4D"
        fillRule="evenodd"
        d="M17.25 11H6.75c-.483 0-.875.448-.875 1v5c0 .552.392 1 .875 1h10.5c.483 0 .875-.448.875-1v-5c0-.552-.392-1-.875-1Zm-10.5-1C5.784 10 5 10.895 5 12v5c0 1.105.784 2 1.75 2h10.5c.966 0 1.75-.895 1.75-2v-5c0-1.105-.784-2-1.75-2H6.75Z"
        clipRule="evenodd"
      />
      <path
        fill="#FFF0C8"
        fillRule="evenodd"
        d="M6.75 11h10.5c.483 0 .875.448.875 1v5c0 .552-.392 1-.875 1H6.75c-.483 0-.875-.448-.875-1v-5c0-.552.392-1 .875-1ZM5 12c0-1.105.784-2 1.75-2h10.5c.966 0 1.75.895 1.75 2v5c0 1.105-.784 2-1.75 2H6.75C5.784 19 5 18.105 5 17v-5Z"
        clipRule="evenodd"
      />
      <path
        fill="#FFF0C8"
        d="M3.772 10.684A1 1 0 0 1 4.721 10h14.558a1 1 0 0 1 .949.684l.333 1A1 1 0 0 1 19.613 13H4.387a1 1 0 0 1-.948-1.316l.333-1Z"
      />
      <path
        fill="#E4CAB1"
        d="M9.208 8.888A2.578 2.578 0 0 1 11.692 7h.593c1.158 0 2.174.772 2.484 1.888l.179.645a2.578 2.578 0 0 1-2.484 3.268h-.95a2.578 2.578 0 0 1-2.485-3.268l.18-.645Z"
      />
      <path
        fill="#C8A584"
        fillRule="evenodd"
        d="M12.081 10.776c.05.05.095.11.134.162l.028.037c.05.064.093.114.143.15.047.032.101.053.176.051a.81.81 0 0 0 .337-.102.129.129 0 1 1 .116.23 1.057 1.057 0 0 1-.449.13.54.54 0 0 1-.327-.099.938.938 0 0 1-.2-.203l-.036-.048-.013-.016-.012.016-.037.048a.938.938 0 0 1-.2.203.54.54 0 0 1-.327.1 1.057 1.057 0 0 1-.448-.13.129.129 0 1 1 .115-.23c.15.075.259.1.337.101.075.002.13-.02.176-.052a.69.69 0 0 0 .143-.15c.01-.01.018-.023.028-.036.04-.053.085-.113.134-.162.05-.05.132-.05.182 0Z"
        clipRule="evenodd"
      />
      <path
        fill="#956F4C"
        d="M11.405 10.376a.175.175 0 0 1 .174-.153h.819c.088 0 .162.065.173.153a.437.437 0 0 1-.433.491h-.3a.437.437 0 0 1-.433-.491Z"
      />
      <path
        fill="#956F4C"
        fillRule="evenodd"
        d="M10.151 7.605a.718.718 0 0 0-.919.136l-.986 1.121a.987.987 0 1 0 1.707.853l.36-1.731a.36.36 0 0 0-.162-.379Zm3.698 0a.718.718 0 0 1 .918.136l.987 1.121a.987.987 0 1 1-1.707.853l-.36-1.731a.36.36 0 0 1 .162-.379Z"
        clipRule="evenodd"
      />
      <path
        fill="#FFF0C8"
        fillRule="evenodd"
        d="M7.8 18v-5h.4v5h-.4Zm2 0v-5h.4v5h-.4Zm2 0v-5h.4v5h-.4Zm2 0v-5h.4v5h-.4Zm2 0v-5h.4v5h-.4Z"
        clipRule="evenodd"
      />
      <path
        fill="#FFF0C8"
        fillRule="evenodd"
        d="M5 16.8h14v.4H5v-.4ZM5 13.8h14v.4H5v-.4ZM5 15.3h14v.4H5v-.4Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default HomelessDogIcon;
