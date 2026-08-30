public class Vehicle {

    String vehicleNumber;
    String ownerName;
    String vehicleType;
    int speed;
    int fuelLevel;

    public Vehicle(String vehicleNumber, String ownerName, String vehicleType, int speed, int fuelLevel) {
        this.vehicleNumber = vehicleNumber;
        this.ownerName = ownerName;
        this.vehicleType = vehicleType;
        this.speed = speed;
        this.fuelLevel = fuelLevel;
    }

    public void displayDetails() {
        System.out.println("-----------------------------");
        System.out.println("Vehicle Number : " + vehicleNumber);
        System.out.println("Owner Name     : " + ownerName);
        System.out.println("Vehicle Type   : " + vehicleType);
        System.out.println("Speed          : " + speed + " km/h");
        System.out.println("Fuel Level     : " + fuelLevel + "%");
    if (isOverspeed()) {
    System.out.println("Status         : Overspeed");
} else {
    System.out.println("Status         : Normal Speed");
}

if (isLowFuel()) {
    System.out.println("Fuel Alert     : Low Fuel");
} else {
    System.out.println("Fuel Alert     : Fuel OK");
}
    
    }

    public boolean isOverspeed() {
        return speed > 80;
    }

    public boolean isLowFuel() {
        return fuelLevel < 20;
    }
}