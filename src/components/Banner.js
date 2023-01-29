import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Music Production", "XR Development", "Graphic Design", "3D Animation" ];
    const toExplain = [ "Get a deal as good as it sounds", "As real as it gets", "If you picture it, we deliver it", "Bring your ad to life!" ];
    const [text, setText] = useState('');
    const [explain, setExplain] = useState(''); 
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
          tick();
        }, delta);
    
        return () => { clearInterval(ticker) };
      }, [text, explain])


    const tick = () => {
        let i = loopNum % toRotate.length;
        let x = loopNum % toExplain.length;
        let fullText = toRotate[i];
        let fullExplain = toExplain[x];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
        let updatedExplain = isDeleting ? fullExplain.substring(0, explain.length - 1) : fullExplain.substring(0, explain.length + 1);

        setText(updatedText);
        setExplain(updatedExplain);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText && !isDeleting && updatedExplain === fullExplain) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '' && isDeleting && updatedExplain === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                <span className="tagline">IaM Creations</span>
                                <h1><span className="wrap">{text}</span></h1>
                                <p>{explain}</p>
                                <button onClick={() => console.log('connect')}>
                                    <span>Let’s Connect<ArrowRightCircle size={25}/></span>
                                </button>
                            </div>}
                        </TrackVisibility>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}