const CronJob = require("cron").CronJob;
const EventEmitter = require("events");

/**
 * Wrap up message generating & sending together in a testable class.
 * EventEmitter docs: https://nodejs.org/api/events.html
 * Cron docs: https://www.npmjs.com/package/cron 
 */
class ScheduledPrompt extends EventEmitter {
  constructor({ cronSchedule, promptGenerator }) {
    super();

    this.job = new CronJob(
      cronSchedule,
      () => {
        const prompt = promptGenerator.get();

        this.emit(ScheduledPrompt.PROMPT_EVENT, prompt);
      },
      null,
      true
    );
  }

  static get PROMPT_EVENT() {
    return "PROMPT_EVENT";
  }
}

module.exports = ScheduledPrompt;
