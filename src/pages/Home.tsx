import Animation from '../components/shared/Animation'

const Home = () => {
    return (
        <div className='relative'>
            <div className=''>
                <div className='lg:grid grid-cols-2'>
                    <div className='pt-[6rem] z-20'>
                        <div className="chat-image p-[2rem]">
                            <img src="chat.png" alt="chat-image" className='w-full rounded-md shdw' />
                        </div>
                    </div>
                    <div className=''>
                        <div className=' text-[0.6rem] md:text-[0.9rem] text-center pt-12 font-semibold mx-4 md:mx-0 '>
                            <Animation />
                        </div>
                        <div className='lg:flex jsutify-center hidden items-center pl-[5rem]'>
                            <img src="robott.png" alt="robot" className='w-[500px] h-[500px]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home