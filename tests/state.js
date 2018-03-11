describe('STOPPED State', () => {
    it('should setup initial state', () => {
      //STOPPED
      expect(status).toBe('STOPPED');
      expect(timerArray.length).toBe(0);
      expect(counter).toBe(0);
      expect(interval).toBe(0);
      expect(currentTimer.ms).toBe('00');
      expect(currentTimer.s).toBe('00');
      expect(currentTimer.m).toBe('00');
      expect(lapButton.style.display).toBe('none');
      expect(pauseButton.style.display).toBe('none');
      expect(resumeButton.style.display).toBe('none');
      expect(resetButton.style.display).toBe('none');
      expect(startButton.style.display).toBe('block');

      //RUNNING
      jasmine.clock().install();
      startEvent();
      expect(status).toBe('RUNNING');
      jasmine.clock().tick(8765);
      expect(counter).toBe(8765);
      expect(currentTimer.ms).toBe('65');
      expect(currentTimer.s).toBe('27');
      expect(currentTimer.m).toBe('01');
      expect(startButton.style.display).toBe('none');
      expect(resetButton.style.display).toBe('none');
      expect(resumeButton.style.display).toBe('none');
      expect(pauseButton.style.display).toBe('block');
      expect(lapButton.style.display).toBe('block');
      expect(timerDiv.innerHTML).toBe('01:27:65');
      jasmine.clock().uninstall();

      //LAP
      jasmine.clock().install();
      startEvent();
      expect(status).toBe('RUNNING');
      let t = 36043-8765;
      jasmine.clock().tick(t);
      expect(counter).toBe(36043);
      lapEvent();
      expect(timerArray.length).toBe(1);
      let firstTimer = timerArray[0];
      expect(firstTimer.ms).toBe('43');
      expect(firstTimer.s).toBe('00');
      expect(firstTimer.m).toBe('06');
      t = 43036-36043;
      jasmine.clock().tick(t);
      expect(counter).toBe(43036);
      lapEvent();
      expect(timerArray.length).toBe(2);
      let secondTimer = timerArray[1];
      expect(secondTimer.ms).toBe('36');
      expect(secondTimer.s).toBe('10');
      expect(secondTimer.m).toBe('07');
      jasmine.clock().uninstall();

      //PAUSE
      jasmine.clock().install();
      startEvent();
      expect(status).toBe('RUNNING');
      t = 88888-43036;
      console.log(t);
      jasmine.clock().tick(t);
      expect(counter).toBe(88888);
      expect(currentTimer.ms).toBe('88');
      expect(currentTimer.s).toBe('48');
      expect(currentTimer.m).toBe('14');
      pauseEvent();
      expect(status).toBe('PAUSED');
      jasmine.clock().tick(11111);
      expect(counter).toBe(88888);
      expect(currentTimer.ms).toBe('88');
      expect(currentTimer.s).toBe('48');
      expect(currentTimer.m).toBe('14');
      expect(startButton.style.display).toBe('none');
      expect(resetButton.style.display).toBe('block');
      expect(resumeButton.style.display).toBe('block');
      expect(pauseButton.style.display).toBe('none');
      expect(lapButton.style.display).toBe('none');
      jasmine.clock().uninstall();

      //RESET
      resetEvent();
      expect(timerArray.length).toBe(0);
      expect(counter).toBe(0);
      expect(currentTimer.ms).toBe('00');
      expect(currentTimer.s).toBe('00');
      expect(currentTimer.m).toBe('00');
      expect(lapButton.style.display).toBe('none');
      expect(pauseButton.style.display).toBe('none');
      expect(resumeButton.style.display).toBe('none');
      expect(resetButton.style.display).toBe('none');
      expect(startButton.style.display).toBe('block');

    });
});
