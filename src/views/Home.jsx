import foodPic from '../assets/home-img1.jpg';
import lifter from '../assets/home-1rm.jpg';
import treadmill from '../assets/treadmill.png'
import { Link } from 'react-router-dom';
import homeHeroImage from '../assets/home-hero.jpg';

export default function Home() {

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const smoothScrollTo = (elementId) => {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            // targetElement.scrollIntoView({ behavior: 'smooth' });
            const yOffset = window.innerHeight / 3; // division by 3 
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - yOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    }

    const user = toTitleCase(localStorage.getItem("user"));

    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${homeHeroImage})`, height: '600px' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-primary-content" style={{textShadow: '0px 0px 15px #6419e6'}}>Welcome, {user}!</h1>
                        <p className="mb-5 text-primary-content">Scroll down to get started!</p>
                        <button className="btn btn-primary btn-wide drop-shadow-lg glow-btn" onClick={() => smoothScrollTo("BMR")}>BMR CALCULATOR</button>
                        <button className="btn btn-primary btn-wide drop-shadow-lg glow-btn mt-5" onClick={() => smoothScrollTo("RMC")}>1RM CALCULATOR</button>
                        <button className="btn btn-primary btn-wide drop-shadow-lg glow-btn mt-5" onClick={() => smoothScrollTo("PT")}>NUTRITION LOOK-UP</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Link to='/bmrcalculator'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-600 text-primary-content place-content-center w-screen hover" style={{ height: '500px' }}>
                        <div className="w-9/12 ml-40 h-96" style={{ boxShadow: '20px 30px 10px #000000' }}>
                            <img src={foodPic} alt="Food Image" />
                        </div>
                        <div className="ml-48">
                            <h1 id="BMR" className='text-4xl font-bold' style={{textShadow: '4px 4px #000000'}}>Basal Metabolic Rate Calculator</h1>
                            <p className="w-full md:w-3/4 mt-16 text-xl">
                                Figuring out your Basal Metabolic Rate is an important step in determing how much you will eat to gain weight or how little you will eat to lose weight.
                                The BMR will give a rough estimate of how many calories your body needs to maintain its weight. This calculator, much like the 1RM Calculator, is an estimate.
                                That means it will not be 100% accurate and you may need to adjust your calories accordingly. To use it, click on this row.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center">
                <Link to='/onerepmax'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-800 text-accent-content place-content-center w-screen hover" style={{ height: '500px' }}>
                        <div className="w-full md:w-1/2 ml-72">
                            <h1 id="RMC" className='text-4xl font-bold' style={{textShadow: '4px 4px #000000'}}>One Rep Max Calculator</h1>
                            <p className="mt-16 text-xl">
                                The 1RM calculator is designed to estimate this maximum weight based on the number of repetitions and the weight you can lift for those repetitions. The most 
                                common way to estimate your 1RM is to input the weight you can lift for a certain number of reps (e.g., 5 or 10 reps), and the calculator will provide an estimate 
                                of your one-rep max. To use it, click on this row.
                            </p>
                        </div>
                        <div className="w-9/12 ml-20 h-96" style={{ boxShadow: '20px 30px 10px #000000' }}>
                            <img src={lifter} alt="Image" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center">
                <Link to='/foodnutrition'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-900 text-secondary-content place-content-center w-screen hover" style={{ height: '500px' }}>
                        <div className="w-9/12 ml-40 h-96" style={{ boxShadow: '20px 30px 10px #000000' }}>
                            <img src={treadmill} alt="Food Image" className="w-full h-auto" />
                        </div>
                        <div className="ml-48">
                            <h1 id="PT" className='text-4xl font-bold' style={{textShadow: '4px 4px #000000'}}>Food Nutrition</h1>
                            <p className="w-full md:w-3/4 mt-20 text-xl">
                                This tool will allow you to look up any food item and get information about its composition. The amount of calories, proteins, fats, and carbs are the things that you will
                                be able to see. Knowing the nutritional composition of your food is an important part in determining the right steps to get to your goal.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
