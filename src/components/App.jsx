import { useState, useEffect } from 'react';
import FeedbackOptions from './feedback-options/FeedbackOptions';
import Section from './section/Section';
import Statistics from './statistics/Statistics';
import Notification from './notification/Notification';

export function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positiveFeedback, setPositiveFeedback] = useState(0);
  const names = ["good", "neutral", "bad"];
  

  const countTotalFeedback = () => {
    setTotal(good + neutral + bad);
  };

  const countPositiveFeedbackPercentage = () => {
    setPositiveFeedback(
      Number(((good / total) * 100).toFixed(0)));
  };
    
  useEffect(() => {
    countTotalFeedback();
    countPositiveFeedbackPercentage();
  });
  
  const onLeaveFeedback = evt => {
    const name = evt.target.name;

    switch (name) {
      case "good":
        setGood(prevState => prevState + 1);
        break;
      case "neutral":
        setNeutral(prevState => prevState + 1);
        break;
      case "bad":
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };


  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={names}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positiveFeedback}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
