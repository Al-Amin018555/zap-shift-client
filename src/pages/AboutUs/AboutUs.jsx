import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

const AboutUs = () => {
    return (
        <div className="bg-base-200 shadow-xl rounded-4xl py-20 mt-8 px-24">
            <div className="space-y-4">
                <h2 className="text-6xl text-black font-extrabold">About Us</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
                <div className="divider"></div>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Story</Tab>
                    <Tab>Misson</Tab>
                    <Tab>Success</Tab>
                    <Tab>Team & Others</Tab>
                </TabList>

                <TabPanel className="mt-12 space-y-4">
                    <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                    <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                    <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AboutUs;