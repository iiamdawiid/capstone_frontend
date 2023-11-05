import heroImage from '../assets/hero.jpg';
import foodTrack from '../assets/trackfood.jpg';
import training from '../assets/training.jpg';
import loseWeight from '../assets/loseWeight.jpg';
import { Link } from 'react-router-dom';

export default function Welcome() {

    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${heroImage})`, height: '600px' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-primary-content">Start your fitness journey!</h1>
                        <p className="mb-5 text-primary-content">Click below to get started!</p>
                        <button className="btn btn-primary btn-wide drop-shadow-lg glow-btn"><Link to='/register'>Get Started</Link></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-600 text-primary-content place-content-center w-screen" style={{ height: '600px' }}>
                    <img src={foodTrack} alt="Image" className="w-9/12 ml-40 h-96" style={{ boxShadow: '25px 25px 10px #000000' }} />
                    <p className="w-full md:w-1/2 ml-48">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim nam natus voluptatibus impedit voluptates velit, sit numquam qui laborum nesciunt blanditiis officia, provident consectetur ipsam! Expedita, quisquam. Minus, fuga.</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-800 text-accent-content place-content-center w-screen" style={{ height: '600px' }}>
                    <p className="w-full md:w-1/2 ml-72">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim nam natus voluptatibus impedit voluptates velit, sit numquam qui laborum nesciunt blanditiis officia, provident consectetur ipsam! Expedita, quisquam. Minus, fuga.</p>
                    <img src={training} alt="Image" className="w-9/12 ml-20 h-96" style={{ boxShadow: '25px 25px 10px #000000' }} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-900 text-secondary-content place-content-center w-screen" style={{ height: '600px' }}>
                    <img src={loseWeight} alt="Image" className="w-9/12 ml-40 h-96" style={{ boxShadow: '25px 25px 10px #000000' }} />
                    <p className="w-full md:w-1/2 ml-48">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim nam natus voluptatibus impedit voluptates velit, sit numquam qui laborum nesciunt blanditiis officia, provident consectetur ipsam! Expedita, quisquam. Minus, fuga.</p>
                </div>
            </div>
        </div>
    )
}
