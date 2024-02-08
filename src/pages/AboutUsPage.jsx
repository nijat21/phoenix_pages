import { motion as m } from 'framer-motion';
import SinglePerson from '../components/SinglePerson';
import NijatPhoto from '../../public/assets/NijatPhoto.jpeg';
import LuisPhoto from "../../public/assets/LuisPhoto.jpeg";


function AboutUsPage() {
  const person1 = {
    name: 'Nijat Ismayilov',
    role: 'Web Developer',
    bio: 'MSc. in Management',
    linkedIn: 'https://www.linkedin.com/in/nijat-ismayilov',
    github: 'https://github.com/nijat21',
    photo: NijatPhoto,
    recentReads: ["Man's Search for Meaning - V.Frankl", "Surely You're Jocking Mr.Feynman - R.Feynman"]
  };

  const person2 = {
    name: 'Luís Gonçalves',
    role: 'Web Developer',
    bio: 'MSc. Aerospace Engineering',
    linkedIn: 'https://www.linkedin.com/in/luis-dearaujo-goncalves',
    github: 'https://github.com/luigoncalves',
    photo: LuisPhoto,
    recentReads: ["Brave New World - A.Huxley", "Amor de Perdição - C.C.Branco"]
  };


  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeIn" }} exit={{ opacity: 0 }}
      className='w-screen h-screen flex items-center justify-center'>
      <div className=' flex justify-center items-center w-3/5  border-2 border-transparent rounded-xl bg-black bg-opacity-20'>
        <SinglePerson person={person1} />
        <SinglePerson person={person2} />
      </div>
    </m.div>
  );
}

export default AboutUsPage;
