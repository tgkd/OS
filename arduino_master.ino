#include <Wire.h>

#include "etherShield.h"
#include "ETHER_28J60.h"

static uint8_t mac[6] = {0x54, 0x55, 0x58, 0x10, 0x00, 0x24};
static uint8_t ip[4] = {192,168,137,140};
static uint16_t port = 80;

ETHER_28J60 ethernet;

void setup()
{
  ethernet.setup(mac, ip, port);
  Wire.begin();
}

void loop()
{
  String param;
  if (param = ethernet.serviceRequest())
  {
    int id = param.substring(4,5).toInt();
    Wire.beginTransmission(9);
    Wire.write(id);
    Wire.endTransmission();
    ethernet.print(id);
    ethernet.respond();

  }
  delay(100);
}
