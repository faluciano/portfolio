interface Logos {
  social: boolean,
  jsx: React.ReactNode,
}

export const PythonLogo = (): Logos => {
  return {
    social: false, 
    jsx:(
      <a key="python" href="https://www.python.org/" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
        >
          <defs>
            <linearGradient
              id="A"
              x1="811.527"
              y1="574.895"
              x2="665.255"
              y2="573.732"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#366a96" />
              <stop offset="1" stopColor="#3679b0" />
            </linearGradient>
            <linearGradient
              id="B"
              x1="862.824"
              y1="642.176"
              x2="573.276"
              y2="642.176"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#ffc836" />
              <stop offset="1" stopColor="#ffe873" />
            </linearGradient>
          </defs>
          <g transform="matrix(.1617 0 0 .158089 -107.53764 -81.66187)">
            <path
              d="M716.255 544.487c0-13.623 3.653-21.034 23.822-24.563 13.693-2.4 31.25-2.7 47.627 0 12.935 2.135 23.822 11.77 23.822 24.563v44.945c0 13.182-10.57 23.98-23.822 23.98h-47.627c-16.164 0-29.787 13.782-29.787 29.363v21.564h-16.376c-13.852 0-21.917-9.988-25.305-23.964-4.57-18.776-4.376-29.963 0-47.945 3.794-15.687 15.917-23.964 29.77-23.964h65.52v-6h-47.645v-17.98z"
              fill="url(#A)"
            />
            <path
              d="M811.527 688.32c0 13.623-11.823 20.523-23.822 23.964-18.052 5.188-32.54 4.394-47.627 0-12.6-3.67-23.822-11.17-23.822-23.964v-44.945c0-12.935 10.782-23.98 23.822-23.98h47.627c15.864 0 29.787-13.71 29.787-29.963v-20.964h17.858c13.87 0 20.4 10.305 23.822 23.964 4.764 18.97 4.976 33.157 0 47.945-4.817 14.364-9.97 23.964-23.822 23.964H763.9v6h47.627v17.98z"
              fill="url(#B)"
            />
            <path
              d="M728.166 541.505c0-4.976 3.988-9 8.93-9 4.923 0 8.93 4.023 8.93 9 0 4.96-4.006 8.982-8.93 8.982-4.94 0-8.93-4.023-8.93-8.982zm53.59 149.798c0-4.96 4.006-8.982 8.93-8.982 4.94 0 8.93 4.023 8.93 8.982 0 4.976-3.988 9-8.93 9-4.923 0-8.93-4.023-8.93-9z"
              fill="#fff"
            />
          </g>
        </svg>
      </a>
    )
  };
};

export const JavaLogo = () : Logos => {
  return { 
      social : false,
      jsx: (
        <a key="java" href="https://www.java.com/en/" className="mr-4 inline-flex h-20 w-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 32 32"
          >
            <path
              d="M11.622 24.74s-1.23.748.855.962c2.51.32 3.847.267 6.625-.267a10.02 10.02 0 0 0 1.763.855c-6.25 2.672-14.16-.16-9.244-1.55zm-.8-3.473s-1.336 1.015.748 1.23c2.725.267 4.862.32 8.55-.427a3.26 3.26 0 0 0 1.282.801c-7.534 2.244-15.976.214-10.58-1.603zm14.747 6.09s.908.748-1.015 1.336c-3.58 1.07-15.014 1.39-18.22 0-1.122-.48 1.015-1.175 1.7-1.282.695-.16 1.07-.16 1.07-.16-1.23-.855-8.175 1.763-3.526 2.51 12.77 2.084 23.296-.908 19.983-2.404zM12.2 17.633s-5.824 1.39-2.084 1.87c1.603.214 4.755.16 7.694-.053 2.404-.214 4.81-.64 4.81-.64s-.855.374-1.443.748c-5.93 1.55-17.312.855-14.052-.748 2.778-1.336 5.076-1.175 5.076-1.175zm10.42 5.824c5.984-3.1 3.206-6.09 1.282-5.717-.48.107-.695.214-.695.214s.16-.32.534-.427c3.794-1.336 6.786 4.007-1.23 6.09 0 0 .053-.053.107-.16zm-9.83 8.442c5.77.374 14.587-.214 14.8-2.94 0 0-.427 1.07-4.755 1.87-4.916.908-11.007.8-14.587.214 0 0 .748.64 4.542.855z"
              fill="#4e7896"
            />
            <path
              d="M18.996.001s3.313 3.366-3.152 8.442c-5.183 4.114-1.175 6.465 0 9.137-3.046-2.725-5.236-5.13-3.74-7.373C14.294 6.893 20.332 5.3 18.996.001zm-1.7 15.335c1.55 1.763-.427 3.366-.427 3.366s3.954-2.03 2.137-4.542c-1.656-2.404-2.94-3.58 4.007-7.587 0 0-10.953 2.725-5.717 8.763z"
              fill="#f58219"
            />
          </svg>
        </a>
      )
    };
};

export const TSLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="typescript" href="https://www.typescriptlang.org/" className="mr-4 inline-flex h-20 w-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
          <path
            d="M0 32v32h64.002V-.002H0zm51.577-2.55c1.625.406 2.865 1.128 4.003 2.306.59.63 1.463 1.778 1.534 2.052.02.08-2.763 1.95-4.45 2.997-.06.04-.305-.223-.58-.63-.823-1.2-1.686-1.717-3.007-1.808-1.94-.132-3.2.884-3.18 2.58 0 .498.07.792.274 1.2.427.884 1.22 1.412 3.708 2.49 4.582 1.97 6.542 3.27 7.76 5.12 1.36 2.062 1.666 5.354.742 7.802-1.016 2.662-3.535 4.47-7.08 5.07-1.097.193-3.698.163-4.876-.05-2.57-.457-5.008-1.727-6.512-3.393-.59-.65-1.737-2.347-1.666-2.47.03-.04.295-.203.59-.376l2.377-1.37 1.84-1.067.386.57c.538.823 1.717 1.95 2.428 2.326 2.042 1.077 4.846.924 6.227-.315.59-.538.833-1.097.833-1.92 0-.742-.09-1.067-.477-1.625-.498-.71-1.514-1.31-4.4-2.56-3.302-1.422-4.724-2.306-6.024-3.708-.752-.813-1.463-2.113-1.758-3.2-.244-.904-.305-3.17-.112-4.084.68-3.2 3.088-5.415 6.563-6.075 1.128-.213 3.75-.132 4.856.142zM36.552 32.12l.02 2.62h-8.33v23.67H22.35v-23.67h-8.33v-2.57l.07-2.64c.03-.04 5.1-.06 11.246-.05l11.185.03z"
            fill="#007acc"
          />
        </svg>
      </a>
    )
  };
};

export const ReactLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key= "react" href="https://reactjs.org/" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
        >
          <g
            transform="matrix(.05696 0 0 .05696 .647744 2.43826)"
            fill="none"
            fillRule="evenodd"
          >
            <circle r="50.167" cy="237.628" cx="269.529" fill="#00d8ff" />
            <g stroke="#00d8ff" strokeWidth="24">
              <path d="M269.53 135.628c67.356 0 129.928 9.665 177.107 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.554 0-127.63-7.492-174.3-23.44-59.046-20.182-94.61-52.103-94.61-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z" />
              <path d="M180.736 186.922c33.65-58.348 73.28-107.724 110.92-140.48C337.006 6.976 380.163-8.48 403.43 4.937c24.248 13.983 33.042 61.814 20.067 124.796-9.8 47.618-33.234 104.212-65.176 159.6-32.75 56.788-70.25 106.82-107.377 139.272-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.3-31.906-56.92-20.834-115.233 9.355-49.27 32.832-109.745 66.8-168.664z" />
              <path d="M180.82 289.482C147.075 231.2 124.1 172.195 114.51 123.227c-11.544-59-3.382-104.11 19.864-117.566 24.224-14.024 70.055 2.244 118.14 44.94 36.356 32.28 73.688 80.837 105.723 136.173 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.057 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.253-112.76-142.115z" />
            </g>
          </g>
        </svg>
      </a>
    )
  };
};

export const JSLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="javascript" href="https://www.javascript.com/" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 1052 1052"
        >
          <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
          <path
            d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
            fill="#323330"
          />
        </svg>
      </a>
    )
  };
};

export const GithubLogo = (): Logos => {
  return {
    social: true,
    jsx: (
      <a key="github" href="https://github.com/faluciano" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 256 249"
          preserveAspectRatio="xMinYMin meet"
        >
          <g fill="#161614">
            <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
            <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
          </g>
        </svg>
      </a>
    )
  };
};

export const LinkedinLogo = (): Logos => {
  return {
    social: true,
    jsx: (
      <a key="linkedin" href="https://www.linkedin.com/in/felix-luciano-salomon-6266021b6/" className="mr-4 inline-flex h-20 w-20">
        <svg
          height="64"
          width="64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <g fill="none">
            <path
              d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z"
              fill="#069"
            />
            <path
              d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z"
              fill="#fff"
            />
          </g>
        </svg>
      </a>
    )
  };
};

export const TailwindLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="tailwind" href="https://tailwindcss.com/" className="mr-4 inline-flex h-20 w-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
          <defs>
            <linearGradient
              x1="0"
              y1="-21.333"
              y2="85.333"
              id="A"
              x2="64"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2383ae" offset="0%" />
              <stop stopColor="#6dd7b9" offset="100%" />
            </linearGradient>
          </defs>
          <path
            d="M16 25.6c2.133-8.533 7.467-12.8 16-12.8 12.8 0 14.4 9.6 20.8 11.2 4.267 1.067 8-.533 11.2-4.8C61.867 27.733 56.533 32 48 32c-12.8 0-14.4-9.6-20.8-11.2-4.267-1.067-8 .533-11.2 4.8zM0 44.8C2.133 36.267 7.467 32 16 32c12.8 0 14.4 9.6 20.8 11.2 4.267 1.067 8-.533 11.2-4.8-2.133 8.533-7.467 12.8-16 12.8-12.8 0-14.4-9.6-20.8-11.2-4.267-1.067-8 .533-11.2 4.8z"
            fill="url(#A)"
            fillRule="evenodd"
          />
        </svg>
      </a>
    )
  };
};

export const CppLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="cpp" href="https://www.cplusplus.com/" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w</a>3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 256 288"
          preserveAspectRatio="xMinYMin meet"
        >
          <path
            d="M255.569 84.72c-.002-4.83-1.035-9.098-3.124-12.761-2.052-3.602-5.125-6.621-9.247-9.008-34.025-19.619-68.083-39.178-102.097-58.817-9.17-5.294-18.061-5.101-27.163.269C100.395 12.39 32.59 51.237 12.385 62.94 4.064 67.757.015 75.129.013 84.711 0 124.166.013 163.62 0 203.076c.002 4.724.991 8.909 2.988 12.517 2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.269 34.015-19.64 68.075-39.198 102.105-58.817 4.217-2.44 7.333-5.544 9.386-9.252 1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345"
            fill="#5C8DBC"
          />
          <path
            d="M128.182 143.509L2.988 215.593c2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.269 34.015-19.64 68.075-39.198 102.105-58.817 4.217-2.44 7.333-5.544 9.386-9.252l-124.413-72.074"
            fill="#1A4674"
          />
          <path
            d="M91.101 164.861c7.285 12.718 20.98 21.296 36.69 21.296 15.807 0 29.58-8.687 36.828-21.541l-36.437-21.107-37.081 21.352"
            fill="#1A4674"
          />
          <path
            d="M255.569 84.72c-.002-4.83-1.035-9.098-3.124-12.761l-124.263 71.55 124.413 72.074c1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345"
            fill="#1B598E"
          />
          <path
            d="M248.728 148.661h-9.722v9.724h-9.724v-9.724h-9.721v-9.721h9.721v-9.722h9.724v9.722h9.722v9.721M213.253 148.661h-9.721v9.724h-9.722v-9.724h-9.722v-9.721h9.722v-9.722h9.722v9.722h9.721v9.721"
            fill="#FFF"
          />
          <path
            d="M164.619 164.616c-7.248 12.854-21.021 21.541-36.828 21.541-15.71 0-29.405-8.578-36.69-21.296a42.062 42.062 0 0 1-5.574-20.968c0-23.341 18.923-42.263 42.264-42.263 15.609 0 29.232 8.471 36.553 21.059l36.941-21.272c-14.683-25.346-42.096-42.398-73.494-42.398-46.876 0-84.875 38-84.875 84.874 0 15.378 4.091 29.799 11.241 42.238 14.646 25.48 42.137 42.637 73.634 42.637 31.555 0 59.089-17.226 73.714-42.781l-36.886-21.371"
            fill="#FFF"
          />
        </svg>
      </a>
    )
  };
};

export const NextjsLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key= "nextjs" href="https://nextjs.org/" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="64"
          viewBox=".5 -.2 1023 1024.1"
          width="64"
        >
          <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
          <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
        </svg>
      </a>
    )
  };
};

export const FlaskLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="flask" href="https://flask.palletsprojects.com/" className="mr-4 inline-flex h-20 w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
          preserveAspectRatio="xMidYMid"
        >
          <path d="M9.563 26.873c-1.22-.96-2.52-1.878-3.408-3.172-1.87-2.283-3.31-4.925-4.294-7.703-.595-1.806-.8-3.743-1.566-5.48-.802-1.26.138-2.64 1.52-3.04.615-.118 1.696-.7.39-.284-1.17.858-1.283-.78-.083-.884.82-.11 1.12-.78.84-1.382-.88-.574 2.132-1.203.616-2.06C2 1.168 5.786.84 4.852 2.774 4.63 4.26 7.498 2.5 6.832 4.218c.677.825 2.534.188 2.487 1.345.986.068 1.324.897 2.25.96.96.433 2.697.774 3.023 1.855-.95.753-3.153-1.555-3.26.53.288 3.08.214 6.252 1.34 9.185.533 1.775 1.825 3.173 2.99 4.556 1.117 1.354 2.63 2.308 4.17 3.11 1.352.638 2.81 1.06 4.283 1.326.597-.457 1.653-2.156 2.584-1.44.045.806-1.85 1.684-.09 1.595 1.035-.312 1.752.8 2.603-.204.785.93 3.26-.593 2.703 1.306-.755.487-1.856.193-2.612.863-1.247-.623-2.24.557-3.62.408-1.533.275-3.092.385-4.646.387-2.55-.2-5.153-.286-7.578-1.174-1.367-.397-2.7-1.175-3.9-1.954zm2.153.933c1.334.576 2.64 1.184 4.1 1.368 2.32.322 4.715.82 7.043.366-1.054-.476-2.143.185-3.193-.34-1.26.27-2.6-.07-3.9-.237-1.455-.648-3.026-1.094-4.388-1.936-1.703-.622.88.798 1.34.913 1.064.604-1.17-.3-1.486-.56-.892-.5-1.005-.396-.088.112l.56.314zm-2.54-1.794c1.293.48-.006-.91-.597-.83-.262-.455-1.003-.743-.48-.987-.94.326-.984-1.24-1.425-1.016-.994-.314-.387-1.426-1.57-2.11-.108-.72-1.176-1.343-1.516-2.428-.15-.556-1.207-2.15-.558-.666.552 1.43 1.524 2.653 2.334 3.875.628 1.164 1.37 2.38 2.514 3.107.386.37.758.937 1.302 1.053zm-3.724-4.09c.045-.195.236.422 0 0zm5.273 4.663c.286-.128-.412-.162 0 0zm.7.256c-.073-.353-.32.198 0 0zm.88.366c.418-.398-.645-.25 0 0zm1.506.84c.254-.375-.813-.14 0 0zm-2.89-2.015c.65-.42-.84-.006 0 0zm.66.33c-.02-.222-.235.1 0 0zm3.293 2.056c.53.334 3.092.732 1.488.137-.27.056-2.975-.766-1.488-.137zm-5.228-4.072c-.05-.222-.822-.246 0 0zm1.533.894c.4-.28-.828-.215 0 0zm1.3.8c.573-.216-.928-.217 0 0zM9.02 23.665c.62.476 2.506.06.95-.284-.707-.377-2.3-.635-1.214.227l.263.057zm4.32 2.637c.26-.44-1.086-.252 0 0zm-1.313-1.043c1.52.43-1.277-.96-.375-.16l.2.09.175.068zm2.632 1.52c1.44.014-1.3-.2 0 0zm-6.193-3.947c-.056-.268-.355.022 0 0zm8.627 5.312c.038-.484-.47.36 0 0zm-6.17-3.81c-.087-.255-.45-.01 0 0zm-2.32-1.67c.826-.05-1.13-.364 0 0zM5.856 20.89c-.103-.396-.898-.712 0 0zm7.212 4.577c-.15-.173-.07.037 0 0zm4.488 2.755c-.014-.264-.244.1 0 0zm-4.885-3.165c.08-.34-.705-.103 0 0zm-3.344-2.12c.615-.065-.985-.415 0 0zm5.656 3.515c.958-.38-.933-.185 0 0zm-2.942-1.997c1.103.142-1.313-.75-.243-.08l.243.08zm3.835 2.358c1.03-.615.69 1.443 1.748.174 1.043-.762-.9.942.384.136.93-.622 2.303.295 3.17.593.624-.03 1.23.54 1.87.193 1.23-.332-2.408-.492-1.454-1.08-1.126.328-1.958-.39-2.513-1.112-1.264-.292-2.724-.938-3.355-2.056-.257-.42.37.06-.222-.627-.76-.677-1.14-1.446-1.652-2.27-.61-.325-.683-1.284-.744-.032.005-.79-.737-1.323-.92-1.102-.003-.76.795-.38.236-.942-.12-.79-.516-1.61-.634-2.502-.185-.43-.026-1.35-.63-.377-.22 1.027-.073-1.262.27-.508.45-.77-.162-.68-.186-.573.293-.65.186-1.572-.077-1.22.156-.69.247-2.535-.233-2.208.29-.72.552-3.297-.712-2.315-.512.007-1.398.186-1.817.394 1.313.724-.132.262-.668.146-.07.67-.6.38-1.26.387 1.058.13-.515 1.08-1.12.712-.788.376.68 1.316.015 1.607.082.437-1.207-.158-1.106.854-.764-.322-.105 1.2.278.685 1.3.352.915 1.154.948 1.917-.212.444-1.046-1.044-.186-.975-.68-1.103-.75-.4-1.315.114-.13.037 1.44.73.454 1.07.867.134.892.893 1.068 1.372.52.543.413-.6 1.037.053-.395-.58-2.09-1.637-.725-1.3-.007-.584-.247-1.056.172-1.045.415-.75-.434 1.85.5.896.258-.113.323-.75.787.06.674.664.244 1.144-.708.536.17.578 1.273.784 1.065 1.687.22.795.527.502.795.456.2.772.33.204.34-.163.962.206.736.775 1.038 1.172.663.3-.95-2.028.19-.7 1.197 1.08.45 1.533-.625 1.36.68-.055.9.92 1.75.885.776.37 1.3 1.787-.036 1.196-.463-.418-2.106-.934-.764-.14 1.238.574 2.222.916 3.416 1.637.854.6 1.223 1.308 1.547 1.447-.718.343-2.164-.274-1.1-.463-.67-.122-1.424-.46-.782.374.546.456 1.933.408 2.182.46-.21.464-.573.5.008.537-.648.346.208.4.268.597zm-1.326-3.744c-.395-.413-.497-1.185-.07-.513.22.088.7 1.263.07.513zM18.87 25.8c.246-.016.007.187 0 0zm-4.94-3.755c-.016-.624.142.48 0 0zm-.43-.577c-.497-.96.625.27 0 0zm-5.202-3.6c.292-.078.144.498 0 0zm4.14 2.244c.18-.673.2.564 0 0zm-2.925-2.034c-.206-.37.43.348 0 0zm2.51.804c-.47-1.053.334-.575.105.172l-.105-.172zm-4.328-2.886c-.2-.346-.557-1.36-.445-1.67.1.504 1.072 2.17.476.7-.658-1.24.787.402.936.712.07.307-.406-.084-.084.638-.588-.822-.347.454-.882-.37zm-1.337-.922c.055-.804.306.55 0 0zm.602.208c.287-.606.486.845 0 0zM5.5 14.182c-.498-.495-.858-.95.024-.307.34.013-.755-1.037.082-.334.88.16.434 1.443-.105.64zm.76-.02c.29-.287.154.282 0 0zm.468.15c-.44-.822.532.345 0 0zm-.93-.888c-1.448-1.29 1.82.673.236.24l-.236-.24zm4.148 2.41c-.627-.375-.167-2.644.047-1.093.61-.197-.034.802.42.792-.07.63-.275.857-.467.3zm1.534.907c.06-.684.13.468 0 0zm-.266-.264c.07-.292.006.344 0 0zM6.092 13c-.93-1.283 2.703 1.298.596.325-.22-.058-.485-.078-.596-.325zm2.955 1.566c-.088-1.08.196.18 0 0zm2.243 1.44c.173-.615.013.407 0 0zM6.235 12.51c.553-.118 2.3.97.695.31-.177-.196-.556-.107-.695-.31zm4.746 2.366c.06-1.105.33-.66.002.16l-.002-.16zm-4.335-2.75c.226-.33-.598-1.493.118-.417.3.246.897.412.38.516.815.72-.2.195-.497-.1zm4.1 2.406c.155-1.26.137.737 0 0zm-4.57-3.568c.172-.074.09.23 0 0zm1.07.637c.275-.578.508.644 0 0zm3.017 1.678c-.002-.22.057.323 0 0zm-.175-.386c-.418-1.033.4.547 0 0zm-.257-.678c-.07-.427.24.536 0 0zm.418-.68c-.288-.506.363-2.23.436-1.16-.303.834-.087 1.3.123.18.39-.88-.084 1.737-.56.98zm.43-2.566c.125-.154.028.185 0 0zM9.96 23.12c-.17-.15.022.094 0 0zm1.48.748c.823.212.82-.128.075-.23-.4-.372-1.662-.767-.532-.046.074.2.31.185.457.275zm-2.92-1.94c.453.34 1.707.958.646.13.358-.416-.685-.638-.34-.916-.88-.54-.695-.5-.078-.473-1.058-.473.153-.437.096-.68-.408-.08-2.026-.72-1.074.052-.968-.493-.23.184-.523.113-1-.27.88.754-.157.5.567.45 1.528 1.153.24.476-.17.244.922.615 1.2.8zm1.547.89c1.88.606-.923-.74 0 0zm7.92 4.798c.024-.374-.257.32 0 0zm.814.343c.434-.42.018.67.72-.103.007-.553-.02-.88-.806-.208-.217.12-.313.63.087.31zM5.878 19.84c-.133-.524-.934-.522 0 0zm.87.57c-.323-.535-1.152-.485 0 0zm4.946 2.983c.483.43 2.218.315.586.053-.24-.357-1.533-.27-.586-.053zm6.798 4.2c.743-.624-.72.278 0 0zm1.546 1.062c.005-.2-.32.087 0 0zm.003-.28c.823-.87-.797.05 0 0zM3.74 18.05c-.7-1-.436-1.45-1.112-2.267-.128-.625-1.16-2.043-.534-.54.574.88.744 2.24 1.646 2.81zm16.04 10.046c1.515-.978-.62-.426 0 0zm1.156.453c.76-.65-.48-.136 0 0zM5.62 18.735c.217-.323-.56-.042 0 0zm15.075 9.505c.734-.473-.17-.4-.133.043l.133-.043zm-9.962-6.28c-.025-.32-.388.027 0 0zm.615.354c-.196-.396-.3.062 0 0zm10.525 6.245c.94-.68-.57-.13-.197.13l.197-.13zm-.36-.174c.767-.642-.81.284 0 0zm1.84 1.225c.514-.344-.625-.11 0 0zm-17.26-11.11c.69.154 2.755 1.698 1.537.107-.624-.185-.25-1.71-.887-1.44.427.714.35 1.018-.546.568-1.127-.55-.633.272-.413.5-.3.07.397.26.31.266zm-3.14-2.48c.123-.51-1.137-2.81-.595-1.152.195.347.175 1.005.595 1.152zm5.766 3.555c-.356-.297-.017-.042 0 0zm.874.204c0-.54-.966-.22 0 0zm7.577 4.776c-.145-.37-.57-.008 0 0zm.364.266c-.054-.207-.2.04 0 0zm3.003 1.892c.29-.213-.36-.028 0 0zM4.52 16.422c.826-.32-.885-.228 0 0zM16.5 23.97c-.01-.535-.527.133 0 0zM4.193 15.66c.53-.18-.49-.118 0 0zm1.54.746c-.01-.176-.163.067 0 0zm18.788 11.52c.682-.138 2.238.347 2.49-.18-.83-.02-2.867-.585-2.963.134l.18.03.293.018zM6.223 16.53c.012-.542-.422-.02 0 0zm-4.05-2.81c-.184-1.032-.7-.156 0 0zm.965.243c.012-.332-.884-.298 0 0zm.552.27c-.16-.13-.124.163 0 0zm3.473 2.227c.164-.15-.387-.11 0 0zm-3.84-2.84c-.094-.78-1.12-.117 0 0zm-1.98-1.285c-.028-.36-.193.136 0 0zm.295-.222c-.048-.427-.253.054 0 0zm1.627.97c.688-.27-1.253-.56-.14-.05l.14.05zM25.043 26.54c.44-.404-.56-.125 0 0zm2.63 1.363c.177-.52-.445.07 0 0zM3.43 12.235c.073-.505-.546.1 0 0zm-2.316-1.55C.992 9.97 1.01 8.72 2.198 9.142c-1.587.316 1.1 1.974.76.664.668.033 1.306-.395.955.253C5.23 9.916 6.14 8.774 7.412 8.935c1-.132 2.072-.23 3.14-.63.877-.063 1.72-1.007 1.24-1.567-1.196-.1-2.448.048-3.77.312-1.465.304-2.795.883-4.273 1.13-1.44.194.29.533-.123.61-.75.26.897.436-.097.712-.614-.117-1.253-.328-.99-.975-1.38.18-2.593.752-1.502 2.156l.08.001zM4.442 9c.323-1.192 1.733.98.53.16-.143-.108-.38-.195-.53-.16zm.063-.578c.467-.347.248.195 0 0zm.593.01c.043-.548 1.358.3.217.197l-.217-.197zm.81-.326c.297-.347.086.307 0 0zm.208-.14c.494-.593 2.793-.38 1.1-.058-.45-.34-.797.2-1.1.058zm3-.463c-.074-1.62 1.492.575 0 0zm.852-.005c.31-.816 1.21-.328.145-.164.023.087-.032.422-.145.164zm-6.873 4.327c.93-.57-.987-.494 0 0zm.688.2c.326-.347-.7-.14 0 0zM1.757 10.57c.53-.41-.63-.155 0 0zm27.47 17.185c.015-.474-.406.213 0 0zm-2.79-1.905c.08-.545-.36.047 0 0zm3.56 2.09c.743.003 2.252-.23.635-.23-.254.04-1.48.03-.635.23zM4.39 11.673c.602-.04.94-.663-.117-.628-1.64-.17 1.446.562-.2.352-.222.147.314.316.327.275zm.53.268c-.063-.386-.186.205 0 0zm.63-1.676c.26-.324-.36-.087 0 0zm-2-3.344c1.074-.365 2.542-.775 3.05.18-.516-.62-.208-1.232.28-.324.69.918 1.034-.418.586-.726.51.634 1.09.934.342.04.815-.98-1.63.128-2.186.117-.267.12-2.76.636-2.07.713zm.63-1.205c.612-.462 2.118.275 1.152-.46-.095-.083-2.115.557-1.152.46zm2.232.092c.716.018-.31-.963.544-.518-.14-.458-.994-.543-1.412-.727-.236.418.48 1.25.867 1.245zm-1.84-2.026c.248-.336-.435.17 0 0zM5.48 4c1.155-.153-.294-.497-.233-.012L5.48 4zM3.776 2.67c-.813-1.062 1.53.178.703-.933-.696-.553-1.363.624-.703.933zm10.434 5.62c.373-.66-1.54-.89-.25-.234.118.04.092.28.25.234z" />
        </svg>
      </a>
    )
  };
};

export const MysqlLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="mysql" href="https://www.mysql.com/" className="mr-4 inline-flex h-20 w-20"> 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 25.6 25.6"
        >
          <path
            d="M179.076 94.886c-3.568-.1-6.336.268-8.656 1.25-.668.27-1.74.27-1.828 1.116.357.355.4.936.713 1.428.535.893 1.473 2.096 2.32 2.72l2.855 2.053c1.74 1.07 3.703 1.695 5.398 2.766.982.625 1.963 1.428 2.945 2.098.5.357.803.938 1.428 1.16v-.135c-.312-.4-.402-.98-.713-1.428l-1.34-1.293c-1.293-1.74-2.9-3.258-4.64-4.506-1.428-.982-4.55-2.32-5.13-3.97l-.088-.1c.98-.1 2.14-.447 3.078-.715 1.518-.4 2.9-.312 4.46-.713l2.143-.625v-.4c-.803-.803-1.383-1.874-2.23-2.632-2.275-1.963-4.775-3.882-7.363-5.488-1.383-.892-3.168-1.473-4.64-2.23-.537-.268-1.428-.402-1.74-.848-.805-.98-1.25-2.275-1.83-3.436l-3.658-7.763c-.803-1.74-1.295-3.48-2.275-5.086-4.596-7.585-9.594-12.18-17.268-16.687-1.65-.937-3.613-1.34-5.7-1.83l-3.346-.18c-.715-.312-1.428-1.16-2.053-1.562-2.543-1.606-9.102-5.086-10.977-.5-1.205 2.9 1.785 5.755 2.8 7.228.76 1.026 1.74 2.186 2.277 3.346.3.758.4 1.562.713 2.365.713 1.963 1.383 4.15 2.32 5.98.5.937 1.025 1.92 1.65 2.767.357.5.982.714 1.115 1.517-.625.893-.668 2.23-1.025 3.347-1.607 5.042-.982 11.288 1.293 15 .715 1.115 2.4 3.57 4.686 2.632 2.008-.803 1.56-3.346 2.14-5.577.135-.535.045-.892.312-1.25v.1l1.83 3.703c1.383 2.186 3.793 4.462 5.8 5.98 1.07.803 1.918 2.187 3.256 2.677v-.135h-.088c-.268-.4-.67-.58-1.027-.892-.803-.803-1.695-1.785-2.32-2.677-1.873-2.498-3.523-5.265-4.996-8.12-.715-1.383-1.34-2.9-1.918-4.283-.27-.536-.27-1.34-.715-1.606-.67.98-1.65 1.83-2.143 3.034-.848 1.918-.936 4.283-1.248 6.737-.18.045-.1 0-.18.1-1.426-.356-1.918-1.83-2.453-3.078-1.338-3.168-1.562-8.254-.402-11.913.312-.937 1.652-3.882 1.117-4.774-.27-.848-1.16-1.338-1.652-2.008-.58-.848-1.203-1.918-1.605-2.855-1.07-2.5-1.605-5.265-2.766-7.764-.537-1.16-1.473-2.365-2.232-3.435-.848-1.205-1.783-2.053-2.453-3.48-.223-.5-.535-1.294-.178-1.83.088-.357.268-.5.623-.58.58-.5 2.232.134 2.812.4 1.65.67 3.033 1.294 4.416 2.23.625.446 1.295 1.294 2.098 1.518h.938c1.428.312 3.033.1 4.37.5 2.365.76 4.506 1.874 6.426 3.08 5.844 3.703 10.664 8.968 13.92 15.26.535 1.026.758 1.963 1.25 3.034.938 2.187 2.098 4.417 3.033 6.56.938 2.097 1.83 4.24 3.168 5.98.67.937 3.346 1.427 4.55 1.918.893.4 2.275.76 3.08 1.25 1.516.937 3.033 2.008 4.46 3.034.713.534 2.945 1.65 3.078 2.54zm-45.5-38.772a7.09 7.09 0 0 0-1.828.223v.1h.088c.357.714.982 1.205 1.428 1.83l1.027 2.142.088-.1c.625-.446.938-1.16.938-2.23-.268-.312-.312-.625-.535-.937-.268-.446-.848-.67-1.206-1.026z"
            transform="matrix(.390229 0 0 .38781 -46.300037 -16.856717)"
            fillRule="evenodd"
            fill="#00678c"
          />
        </svg>
      </a>
    )
  };
};

export const ExpoLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="expo" href="https://expo.dev/" className="mr-4 inline-flex h-20 w-20">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.39 8.269c.19-.277.397-.312.565-.312.168 0 .447.035.637.312 1.49 2.03 3.95 6.075 5.765 9.06 1.184 1.945 2.093 3.44 2.28 3.63.7.714 1.66.269 2.218-.541.549-.797.701-1.357.701-1.954 0-.407-7.958-15.087-8.759-16.309C14.027.98 13.775.683 12.457.683h-.988c-1.315 0-1.505.297-2.276 1.472C8.392 3.377.433 18.057.433 18.463c0 .598.153 1.158.703 1.955.558.81 1.518 1.255 2.218.54.186-.19 1.095-1.684 2.279-3.63 1.815-2.984 4.267-7.029 5.758-9.06z"
            fill="#000"
          />
        </svg>
      </a>
    )
  };
};

export const GoLogo = (): Logos => {
  return {
    social: false,
    jsx: (
      <a key="go" href="https://golang.org/" className="mr-4 inline-flex h-20 w-20">
        <svg xmlns="http://www.w3.org/2000/svg" 
          height="64" 
          viewBox="16.8 16.1 72.9 27.6" 
          width="64">
            <switch>
              <g fill="#00acd7">
                <path d="m22.3 24.7c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h12.6c.1 0 .2.1.1.2l-.6.9c-.1.1-.2.2-.4.2zm-5.3 3.2c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h16.1c.1 0 .2.1.2.2l-.3 1c0 .1-.2.2-.3.2zm8.5 3.3c-.1 0-.2-.1-.1-.2l.5-.9c.1-.1.2-.2.4-.2h7c.1 0 .2.1.2.2l-.1.8c0 .1-.1.2-.2.2zm36.6-7.2-5.9 1.5c-.5.1-.6.2-1-.4-.5-.6-.9-1-1.7-1.3-2.2-1.1-4.4-.8-6.4.5-2.4 1.5-3.6 3.8-3.6 6.7 0 2.8 2 5.1 4.8 5.5 2.4.3 4.4-.5 6-2.3.3-.4.6-.8 1-1.3h-6.8c-.7 0-.9-.5-.7-1.1.5-1.1 1.3-2.9 1.8-3.8.1-.2.4-.6.9-.6h12.8c-.1 1-.1 1.9-.2 2.9-.4 2.5-1.3 4.9-2.9 6.9-2.5 3.3-5.8 5.4-10 6-3.5.5-6.7-.2-9.5-2.3-2.6-2-4.1-4.6-4.5-7.8-.5-3.8.7-7.3 3-10.3 2.5-3.3 5.8-5.4 9.9-6.1 3.3-.6 6.5-.2 9.3 1.7 1.9 1.2 3.2 2.9 4.1 5 .1.4 0 .5-.4.6z"/>
                <path d="m73.7 43.5c-3.2-.1-6.1-1-8.6-3.1-2.1-1.8-3.4-4.1-3.8-6.8-.6-4 .5-7.5 2.9-10.6 2.6-3.4 5.7-5.1 9.9-5.9 3.6-.6 7-.3 10 1.8 2.8 1.9 4.5 4.5 5 7.9.6 4.8-.8 8.6-4 11.9-2.3 2.4-5.2 3.8-8.4 4.5-1.1.2-2.1.2-3 .3zm8.4-14.2c0-.5 0-.8-.1-1.2-.6-3.5-3.8-5.5-7.2-4.7-3.3.7-5.4 2.8-6.2 6.1-.6 2.7.7 5.5 3.2 6.7 1.9.8 3.9.7 5.7-.2 2.9-1.4 4.4-3.7 4.6-6.7z"/>
              </g>
            </switch>
        </svg>
      </a>
    )
  };
};

export const XLogo = (): Logos => {
  return {
    social: true,
    jsx: (
      <a key="x" href="https://twitter.com/picapollo821" className="mr-4 inline-flex h-20 w-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 48 48">
        <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path>
        <path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path>
        <polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon>
        <polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
        </svg>
      </a>
    )
  }
};