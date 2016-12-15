#include <SoftwareSerial.h>
#include <DFPlayer_Mini_Mp3.h>
#include <Wire.h>
void setup() {
  Serial.begin (9600);
  mp3_set_serial (Serial);
  delay(100);
  mp3_set_volume (15);
  delay(100);
  Wire.begin(9);
  delay(100);
  Wire.onReceive(receiveEvent);
}
void receiveEvent(int bytes) {
  while (Wire.available()) {
    int x = Wire.read();
    Serial.print("\n i2c data \n");
    Serial.print(x);
    Serial.print("\n");
    if(x == 0){
      mp3_stop ();
    } else {
      delay(1000);
      mp3_play (x);
    }
  }
}
void loop () {
  //mp3_play (4);
  //delay (16000);
  delay (100);
}

