import { format } from "date-fns";
import styles from "../../styles/ScheduleItem.module.css";
import { useEffect, useState } from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Separator from "../Separator";
import useAuth from "../../hooks/useAuth";
import { CONTENTFUL_NULL_FIELD } from "../../lib/constants";
import Checkmark from "../Icons/Checkmark";
import Person from "../Icons/Person";
import Spinner from "../Animations/Spinner";
import { motion } from "framer-motion";
import _ from "lodash";
const scheduleRequest = (slug, method) =>
  fetch("/api/schedule-register", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });

export default function ScheduleItem({
  item,
  attendees,
  registration = null,
  mutate,
}) {
  const [seeMore, setSeeMore] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [numberOfAttendees, setNumberOfAttendees] = useState(0);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (attendees) {
      setIsRegistered(
        registration && attendees && attendees.includes(registration.email)
      );
      setNumberOfAttendees(attendees.length);
    }
  }, [attendees]);
  const time = new Date(item.time);
  let timeEnd = time;
  if (item.timeEnd) {
    timeEnd = new Date(item.timeEnd);
  }
  const register = () => {
    setFetching(true);
    scheduleRequest(item.slug, "put").then(() => {
      mutate("/api/get-schedule");
      setFetching(false);
    });
  };

  const remove = () => {
    setFetching(true);
    scheduleRequest(item.slug, "delete").then(() => {
      mutate("/api/get-schedule");
      setFetching(false);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 640) {
        setSeeMore(true);
      }
    }
  }, []);
  // const options = {
  //   renderMark: {
  //     [MARKS.BOLD]: (text) => `<custom-bold>${text}<custom-bold>`,
  //   },
  //   renderNode: {
  //     [BLOCKS.PARAGRAPH]: (node, next) =>
  //       `<custom-paragraph>${next(node.content)}</custom-paragraph>`,
  //   },
  // };
  const itemDesc = item.desc.content[0].content[0].value;
  const desc = itemDesc.length > 100 ? itemDesc.slice(0, 100) : itemDesc;
  return (
    // <Link href={`/schedule/${item.slug}`}>
    <div
      style={{
        backgroundColor: isRegistered ? "" : "",
        marginBottom: 20,
      }}
    >
      <div>
        {isRegistered ? (
          <div
            className="littleText"
            style={{
              color: isRegistered ? "var(--lime)" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 220,
              fontWeight: "bold",
            }}
          >
            <Checkmark color="var(--lime)" />
            You are attending this!
          </div>
        ) : (
          ""
        )}
        <div style={{}} className={styles.title}>
          {item.title}
        </div>

        {isRegistered && (
          <div className="flex items-center" style={{ marginTop: 2 }}>
            {numberOfAttendees} <Person style={{ marginLeft: 4 }} />
          </div>
        )}

        <div className={styles.time}>
          {format(time, "h:mmaaaaa'm'")} - {format(timeEnd, "h:mmaaaaa'm'")}
        </div>
        <div className={styles.room}>
          {item.room !== "null" && _.startCase(item.room)}
        </div>
        {desc !== CONTENTFUL_NULL_FIELD && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: !seeMore
                ? `<p>${desc}...</p>`
                : documentToHtmlString(item.desc),
            }}
          ></div>
        )}
        {desc !== CONTENTFUL_NULL_FIELD && (
          <button className="linkButton" onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "See less" : "See more info"}
          </button>
        )}
        <div style={{ marginTop: 20 }}>
          {registration && !isRegistered && (
            <motion.button
              layout
              disabled={fetching}
              className="smallButton"
              onClick={register}
            >
              {fetching ? <Spinner /> : "I will attend!"}
            </motion.button>
          )}
          {isRegistered && (
            <motion.button
              disabled={fetching}
              className="smallButton remove"
              onClick={remove}
            >
              {fetching ? <Spinner /> : "Remove from my schedule"}
            </motion.button>
          )}
        </div>
      </div>
      <Separator />
    </div>
    // </Link>
  );
}
