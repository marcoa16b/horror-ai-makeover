// Declaration of two-up element to avoid TypeScript errors
declare namespace JSX {
    interface IntrinsicElements {
        'two-up': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        >;
    }
}
