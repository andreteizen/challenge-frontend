export const EnergyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill={props.fill || '#2188FF'}
      d="M14 5.272h-3.934l3.537-4.47a.143.143 0 0 0-.112-.232H6.643a.14.14 0 0 0-.123.072l-4.627 7.99a.142.142 0 0 0 .123.215H5.13l-1.596 6.386c-.034.14.134.237.237.137l10.327-9.853A.142.142 0 0 0 14 5.272m-8.39 6.664 1.077-4.303h-2.81l3.385-5.847h4.011l-3.72 4.702h3.768z"
    ></path>
  </svg>
);

export const CompanyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill={props.fill || '#fff'}
      d="M4.344 6.374h5.344q.01 0 .02-.002a.124.124 0 0 0 .103-.143l-.628-3.875a.124.124 0 0 0-.124-.105H4.972a.124.124 0 0 0-.124.105L4.22 6.229l-.001.02c0 .069.056.125.125.125m1.425-3.062H8.26l.323 2h-3.14zm.039 4.417a.124.124 0 0 0-.124-.105H1.597a.124.124 0 0 0-.124.105l-.628 3.875-.001.02c0 .069.056.125.125.125h5.344q.01 0 .02-.002a.124.124 0 0 0 .103-.143zM2.07 10.687l.324-2h2.492l.323 2zm11.085.917-.628-3.875a.124.124 0 0 0-.124-.105H8.316a.124.124 0 0 0-.124.105l-.628 3.875q-.002.01-.002.02c0 .069.057.125.125.125h5.344q.01 0 .02-.002a.126.126 0 0 0 .104-.143m-4.366-.917.324-2h2.492l.323 2z"
    ></path>
  </svg>
);

export const CriticalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill={props.fill || '#2188FF'}
      d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 12.813A5.813 5.813 0 0 1 8 2.188a5.813 5.813 0 0 1 0 11.625"
    ></path>
    <path
      fill={props.fill || '#2188FF'}
      d="M7.25 10.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0M7.625 9h.75a.125.125 0 0 0 .125-.125v-4.25a.125.125 0 0 0-.125-.125h-.75a.125.125 0 0 0-.125.125v4.25c0 .069.056.125.125.125"
    ></path>
  </svg>
);
