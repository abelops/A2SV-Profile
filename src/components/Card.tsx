import './style.css';

// Type for the profile details
type ProfileProp = {
    name: string;
    languages: string[];
    occupation: string;
    image: string;
}

// ProfileDetail component to display profile information
const ProfileDetail = ({image, name, occupation, languages}: ProfileProp) => {
    return (
        <div className="flex">
            <img src={image} className='animated-element ml-2' />
            
            <div className="flex flex-col ml-10 text-left mt-4">
                <h1 className='font-bold text-lg'>{name}</h1>
                <h1 className='text-lg mt-2'>{occupation}</h1>
                <div className='flex gap-2 pb-3 border-orange-400 border-b-2'>
                    {/* Mapping over languages array to display each language */}
                    {languages.map((lang: string) => {
                        return (
                            <span key={Math.random()} className='text-gray-600'>{lang}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// Contact component to display contact information
const Contact = ({phone}: {phone: string}) => {
    return (
        <div className='w-72 flex justify-center'>
            <div className='flex flex-col justify-center gap-2 text-left'>
                <p>Phone: {phone ? phone : "hidden"}</p>
                <p>Email: abelgetahun55@gmail.com</p>
                <span className='px-4 py-2 w-24 ml-16 flex justify-center bg-orange-400 text-white rounded-full text-sm'>Contact</span>
            </div>
        </div>
    )
}

// Props type for the Card component
type Props = {
    name: string;
    phone: string;
    languages: string[];
    occupation: string;
    image: string;
    tags: string[];
}

// Card component to display a profile card
const Card = ({name, phone, languages, occupation, image, tags}: Props) => {
    return (
        <div className="w-full h-100 shadow-md rounded-lg bg-slate-50 text-black relative flex">
            <span className="w-4 bg-orange-400 h-full rounded-tl-lg rounded-bl-lg ml-[-2px]"></span>
            <div className="px-4 py-4 my-10 mx-10 flex flex-col">
                {/* ProfileDetail component to display profile information */}
                <ProfileDetail image={image} name={name} occupation={occupation} languages={languages} />
                { tags ? 
                    (<div className='flex gap-2 mt-10'>
                        {/* Mapping over tags array to display each tag */}
                        {tags.map((tag) => {
                            return (
                                <span key={Math.random()} className='px-4 py-2 bg-orange-400 text-white rounded-full text-sm'>{tag}</span>
                            )
                        })}
                    </div>) : "No tags"
                }
            </div>
            {/* Contact component to display contact information */}
            <Contact phone={phone}/>
        </div>
    )
}

export default Card;