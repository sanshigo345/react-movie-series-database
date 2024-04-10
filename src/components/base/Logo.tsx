import classNames from "classnames";

type LogoProps = {
  width?: number;
  height?: number;
  viewBox?: string;
  animated?: boolean;
  loading?: boolean;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({
  width = 80,
  height = 80,
  animated = false,
  loading = false,
  className,
}) => {
  const classes = classNames({
    "scale-150": animated || loading,
    "scale-100": !animated,
    "h-full transform origin-center transition duration-500": true,
    [className!]: className,
  });
  return (
    <div className={classes}>
      {loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width * 0.45} ${height * 0.45}`}
          role="img"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" stroke="#DA2F47" />
          <path
            d="M 12 2 a 10 10 0 0 1 10 10"
            strokeLinecap="round"
            fill="none"
            strokeWidth="2"
            stroke="#DA2F47"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
    </div>
  );
};

export default Logo;
