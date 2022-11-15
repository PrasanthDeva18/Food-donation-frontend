import React from 'react'
import image4 from './images/image4.png';
import image33 from './images/image33.jpg';
import Footer from '../Footer';

const About = () => {
    return (
        <div>
        <div className="container my-5">
            <div className="row featurette d-flex justify-content-center align-items-center">
                <div className="col-md-7">
                    <h2 className="featurette-heading">
                        <span className="text-muted">
                            Lead a movement towards{' '}
                        </span>
                        zero hunger
                    </h2>
                    <p className="lead">
                        We design interventions to ensure reliable meals for
                        children in underserved communities where food can
                        act as an incentive to education and skill
                        development. We support Slum Schools, Skill
                        Development centres, Creches, Community Development
                        Centres and Child Shelter Homes.
                    </p>
                </div>
                <div className="col-md-5">
                    <img
                        className="img-fluid rounded"
                        src={image33}
                        alt=""
                    />
                </div>
            </div>
            <hr />
            <div className="row featurette d-flex justify-content-center align-items-center">
                <div className="col-md-7 order-md-2">
                    <h2 className="featurette-heading">
                        <span className="text-muted">Become an </span>
                        agent of change
                    </h2>
                    <p className="lead">
                        A network of highly passionate citizens who care
                        deeply about the potential the future generation
                        holds. We help mobilize food from various sources to
                        those in need through solutions that can ensure the
                        lack of reliable meals is never an obstacle for a
                        future with more education, better health and better
                        economic status.
                    </p>
                </div>
                <div className="col-md-5 order-md-1">
                    <img className="img-fluid" src={image4} alt="" />
                </div>
            </div>
          
        </div>
        <Footer/>
        </div>
    )
}

export default About