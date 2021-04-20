import { getFeaturedEvents } from "../data";
import EventList from "../components/EventList";

const Home = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );    
};
export default Home;
