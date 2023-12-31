import heroImage from '../assets/hero.jpg';
import foodTrack from '../assets/trackfood.jpg';
import training from '../assets/training.jpg';
import loseWeight from '../assets/loseWeight.jpg';
import { Link } from 'react-router-dom';

export default function Welcome() {

    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${heroImage})`, height: '600px', width: '100vw' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-primary-content" style={{textShadow: '0px 0px 15px #6419e6'}}>Start your journey!</h1>
                        <p className="mb-5 text-primary-content text-xl font-bold">Click below to get started!</p>
                        <button className="btn btn-primary btn-wide drop-shadow-lg glow-btn"><Link to='/register'>Get Started</Link></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Link to='/register'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-600 text-primary-content place-content-center w-screen hover" style={{ height: '500px' }}>
                        <div className="w-9/12 ml-40 h-96" style={{ boxShadow: '20px 30px 10px #000000' }}>
                            <img src={foodTrack} alt="Food Image" />
                        </div>
                        <div className="ml-48">
                            <h1 className='text-4xl font-bold' style={{textShadow: '4px 4px #000000'}}>Calculating Calories</h1>
                            <p className="w-full text-xl md:w-3/4 mt-10">
                                Knowing where to start can be a difficult task. We can help you with any fitness goal whether it be losing weight or gaining muscle.
                                Tracking your food intake is a crucial step in transforming your body as it provides valuable insights into your dietary habits and 
                                helps you achieve your health and fitness goals. With our BMR Calorie Calculator, you will understand how many calories your body needs to 
                                maintain its weight which is an important step in determining how much you will have to eat to lose or gain weight.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center">
                <Link to='/register'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-800 text-accent-content place-content-center w-screen hover" style={{ height: '500px' }}>
                        <div className="w-full md:w-1/2 ml-72">
                            <h1 className='text-4xl font-bold' style={{textShadow: '4px 4px #000000'}}>One Rep Max</h1>
                            <p className="w-full text-xl mt-12">
                                A one-rep max refers to the maximum amount of weight that a person can lift for a single repetition of a given exercise. The 1RM calculator is designed 
                                to estimate this maximum weight based on the number of repetitions and the weight you can lift for those repetitions. The most common way to estimate your 
                                1RM is to input the weight you can lift for a certain number of reps (e.g., 5 or 10 reps), and the calculator will provide an estimate of your one-rep max.
                            </p>
                        </div>
                        <div className="w-9/12 ml-20 h-96" style={{ boxShadow: '20px 30px 10px #000000' }}>
                            <img src={training} alt="Image" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center">
                <Link to='/register'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded bg-indigo-900 text-secondary-content place-content-center w-screen hover" style={{ height: '500px' }}>
                        <div className="w-9/12 ml-40 h-96" style={{ boxShadow: '20px 30px 10px #000000' }}>
                            <img src={loseWeight} alt="Food Image" />
                        </div>
                        <div className="ml-48">
                            <h1 className='text-4xl font-bold' style={{textShadow: '4px 4px #000000'}}>Food Nutrition Look-Up</h1>
                            <p className="w-full md:w-3/4 text-xl mt-12">
                                Through the use of the Nutrition API brought to you by API Ninjas, you can find out exactly how many calories are a part of your diet. Knowing how many calories you eat
                                is paramount in ensuring you are progressing towards your goal. This nutritional tool will take all the guess work out of dieting and give you calorie approximations which
                                you can use to track what you eat throughout the day. In doing so, you can be confident knowing you are improving each day and taking strides towards a better you.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
