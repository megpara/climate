import * as contentful from "contentful";

class Contentful {
  client;
  contentTypes = {
    scheduleEntry: "scheduleEntry",
    speaker: "speaker",
  };

  constructor() {
    this.client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  getAllScheduleEntries() {
    return this.client
      .getEntries({ content_type: this.contentTypes.scheduleEntry })
      .then((entry) => {
        return entry.items
          .map((entry) => {
            const { title, time, description } = entry.fields;
            return { title, time, description };
          })
          .sort((a, b) => new Date(a.time) - new Date(b.time));
      });
  }

  getAllSpeakers() {
    return this.client
      .getEntries({ content_type: this.contentTypes.speaker })
      .then((entry) => {
        return entry.items.map((entry) => {
          const {
            name,
            photo: {
              fields: {
                file: { url },
              },
            },
            jobTitle,
            description,
          } = entry.fields;
          return { name, photoUrl: url, jobTitle, description };
        });
      });
  }
}

export default Contentful;
