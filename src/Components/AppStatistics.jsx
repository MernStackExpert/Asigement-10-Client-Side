import { FaUsers, FaDownload, FaRegSmile } from "react-icons/fa";

const AppStatistics = () => (
  <section className="bg-primary text-primary-content rounded-3xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div>
      <FaUsers className="text-4xl mx-auto mb-2" />
      <div className="text-4xl font-black">50K+</div>
      <div className="opacity-80">Active Users</div>
    </div>
    <div>
      <FaDownload className="text-4xl mx-auto mb-2" />
      <div className="text-4xl font-black">100K+</div>
      <div className="opacity-80">App Downloads</div>
    </div>
    <div>
      <FaRegSmile className="text-4xl mx-auto mb-2" />
      <div className="text-4xl font-black">4.9/5</div>
      <div className="opacity-80">User Rating</div>
    </div>
  </section>
);
export default AppStatistics;