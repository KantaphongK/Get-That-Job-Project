import { useState, useEffect } from "react";
import axios from "axios";
import YourApplicationSideBar from "@/components/ProfessionalSideBar/YourApplicationSideBar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

import cancelIcon from "../images/ApllicationApplyPage/cancel.svg";
import closedIcon from "../images/ApllicationApplyPage/closed.svg";
import letterIcon from "../images/ApllicationApplyPage/letter.svg";
import letterSentIcon from "../images/ApllicationApplyPage/letter-sent.svg";
import pendingIcon from "../images/ApllicationApplyPage/pending.svg";
import calendar from "../images/ApllicationApplyPage/calendar-lightgray.svg";
import category from "../images/ApllicationApplyPage/category.svg";
import dollarIcon from "../images/ApllicationApplyPage/dollar.svg";
import timeIcon from "../images/ApllicationApplyPage/time-lightgray.svg";


function TestYourApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const {user_id} = useParams();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getApplication = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/apply/user/${user_id}`
      );
      setApplications(results.data.data);
      console.log(results.data.data);
      console.log("Loaded the applications successfully");
    } catch (error) {
      console.error("Error: unable to load applications", error);
    }
  };

  useEffect(() => {
    getApplication();
    console.log("My Application are", applications);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className="flex flex-row bg-Background">
        <YourApplicationSideBar />
        <div className="w-full flex justify-center overflow-x-hidden">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Your applications
            </div>

            <div className="w-full p-2 space-y-4">
              <div>
                <label
                  htmlFor="radioLabel"
                  className="text-DarkGray uppercase text-Overline font-Inter font-normal tracking-[1.5px]"
                >
                  filter your applications
                </label>

                <RadioGroup
                  defaultValue="all"
                  className="flex flex-row space-x-1 font-normal font-Inter text-Body2 tracking-[o.25px]"
                  onValueChange="n/a"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1" className="text-Gray font-normal ">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="waiting" id="r2" />
                    <Label htmlFor="r2" className="text-Gray font-normal">
                      Waiting
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="closed" id="r3" />
                    <Label htmlFor="r3" className="text-Gray font-normal">
                      In progress
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="finished" id="r4" />
                    <Label htmlFor="r4" className="text-Gray font-normal">
                      Finished
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="declined" id="r5" />
                    <Label htmlFor="r5" className="text-Gray font-normal">
                      Declined
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full space-y-2">
                <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                  0 Applications found
                </div>

                {/* ส่วน Accordian */}
                <Accordion type="single" collapsible>
                  <AccordionItem>
                    <AccordionTrigger onClick={toggleAccordion}>
                      {/* Big container */}
                      <div className="flex flex-row py-[16px]">
                        {/* section 1*/}
                        <div className="font-Montserrat flex flex-row">
                          <div className="w-[59px] h-[59px] bg-Pink rounded-sm">
                            logo
                          </div>
                          <div className="flex flex-col ml-[16px] justify-center">
                            <p className="text-DarkGray text-[20px] text-normal leading-[28px] tracking-[0.15px]">
                              The Job Title
                            </p>
                            <p className="text-Gray text-[14px] font-normal leading-[18px] tracking-[0.1px]">
                              Company Name
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="flex flex-col font-Inter text-LightGray text-[12px] font-normal leading-[16px] tracking-[0.4px]">
                        <div className="flex flex-row">
                          <img src={category} />
                          <p className="ml-[4px]">Manufacturing</p>
                          <img src={calendar} className="ml-[4px]" />
                          <p className="ml-[4px]">Full time</p>
                        </div>
                        <div className="mt-[8px] flex flex-row">
                          <img src={dollarIcon} />
                          <p className="ml-[4px]">2.0 k</p> - <p>2.5 k</p>
                          <img className="ml-[4px]" src={timeIcon} />
                          <p className="ml-[4px]">Posted 2 days ago</p>
                        </div>
                      </div>

                      {/* Section 3 */}
                      <div className="m-[4px] flex flex-row font-Inter text-Gray text-[12px] font-normal leading-[16px] tracking-[0.4px]">
                        <div className="flex flex-col w-[80px] h-[47px] items-center">
                          <img className="w-[15px] h-[15px]" src={letterIcon} />
                          <p>sent 1 minute ago</p>
                        </div>
                        <div className="flex flex-col text-Pink w-[80px] h-[47px] items-center">
                          <img
                            className="w-[15px] h-[15px]"
                            src={pendingIcon}
                          />
                          <p>Waiting for review</p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <div className="flex flex-col font-Inter text-[14px] font-normal leading-[20px] tracking-[0.25px]">
                      <h1 className="mt-[16px] font-Montserrat text-Pink text-[16px] font-normal">
                        Professional Experience
                      </h1>
                      <p className="w-[760px]">test</p>
                      <h1 className="mt-[16px] font-Montserrat text-Pink text-[16px] font-normal">
                        Why are you interested in working at The company name SA
                      </h1>
                      <p className="w-[760px]">test</p>
                    </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TestYourApp;
