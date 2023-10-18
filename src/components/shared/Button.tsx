type Props = {
    name: string,
    type: 'submit' | 'reset' | 'button' | undefined;
}

const Button = (props: Props) => {
    return (
        <>
            <button type={props.type} className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-6 text-[0.8rem] md:text-[1rem]">{props.name}</button>
        </>
    )
}

export default Button