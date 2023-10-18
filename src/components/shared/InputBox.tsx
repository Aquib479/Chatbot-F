import React from 'react'

type Props = {
    name: string,
    type: string,
    placeholder: string,
    label: string,
}

const InputBox = (props: Props) => {
    return (
        <>
            <div className='w-full mb-4'>
                <label className="text-slate-300 mx-1 text-[0.8rem] md:text-[1rem]">{props.label}</label>
                <input type={props.type} name={props.name} id={props.name} placeholder={props.placeholder} className="w-full text-[0.8rem] md:text-[0.9rem] px-4 py-3 rounded-lg bg-transparent mt-1 border border-slate-300 focus:outline-none shadow-sm shadow-white" required />
            </div>
        </>
    )
}

export default InputBox