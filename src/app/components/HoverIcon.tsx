import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  variant: "trash" | "plus" | "edit" | "right";
};

export default function HoverIcon({ variant, ...props }: IconProps) {
  switch (variant) {
    case "trash":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <rect
            x="8"
            y="3"
            width="8"
            height="3"
            rx="0.666"
            fill="currentColor"
          />
          <path
            d="M19.333 6.60059C19.7011 6.60058 19.9999 6.89849 20 7.2666V8.55176C19.9999 8.91985 19.7011 9.21777 19.333 9.21777H19.1279C18.7599 9.21796 18.462 9.51674 18.4619 9.88477V20.333C18.4619 20.7012 18.1631 21 17.7949 21H6.5127C6.14452 21 5.8457 20.7012 5.8457 20.333V9.88574C5.8457 9.51765 5.54775 9.2189 5.17969 9.21875H4.66699C4.2988 9.21875 4 8.91995 4 8.55176V7.26758C4 6.8994 4.29881 6.60059 4.66699 6.60059H19.333ZM10.1523 17.1885H11.0752V10.4121H10.1523V17.1885ZM12.9219 10.4121V17.1885H13.8447V10.4121H12.9219Z"
            fill="currentColor"
          />
        </svg>
      );

    case "plus":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 12L7 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "edit":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0423 5.06836C16.4656 5.06836 16.821 5.21119 17.1078 5.49793L18.502 6.89303C18.7887 7.17974 18.9324 7.53448 18.9324 7.95763C18.9324 8.38078 18.7887 8.73552 18.502 9.02223L9.17241 18.3519L5.83408 19.0478C5.56979 19.1064 5.34199 19.0397 5.15115 18.8488C4.96044 18.6581 4.89448 18.4309 4.95301 18.1667L5.64812 14.8276L14.9778 5.49793C15.2644 5.21137 15.6193 5.06841 16.0423 5.06836ZM16.0464 6.30267C15.9745 6.3027 15.9149 6.32702 15.8669 6.37495L7.36398 14.869L9.131 16.636L17.6258 8.13384C17.6738 8.08589 17.6973 8.0255 17.6973 7.95357C17.6973 7.88155 17.6738 7.82122 17.6258 7.77329L16.2267 6.37495C16.1787 6.32699 16.1185 6.30267 16.0464 6.30267Z"
            fill="currentColor"
          />
        </svg>
      );

    case "right":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M8.99953 8.12441L12.8795 12.0044L8.99953 15.8844C8.60953 16.2744 8.60953 16.9044 8.99953 17.2944C9.38953 17.6844 10.0195 17.6844 10.4095 17.2944L14.9995 12.7044C15.3895 12.3144 15.3895 11.6844 14.9995 11.2944L10.4095 6.70442C10.0195 6.31441 9.38953 6.31441 8.99953 6.70442C8.61953 7.09442 8.60953 7.73441 8.99953 8.12441Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
