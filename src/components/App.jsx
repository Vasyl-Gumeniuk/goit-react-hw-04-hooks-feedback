import { useState } from 'react';
import FeedbackOptions from './feedback-options/FeedbackOptions';
import Section from './section/Section';
import Statistics from './statistics/Statistics';
import Notification from './notification/Notification';

export function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const names = Object.keys({ good, neutral, bad });
  

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => 
  countTotalFeedback()
      ? Math.floor((good * 100) / countTotalFeedback())
      : 0;
 
 
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
        {countTotalFeedback() !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
