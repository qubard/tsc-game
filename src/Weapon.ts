// TODO
export class Weapon {

    private ammo: number;
    private maxAmmo: number;

    shoot() {
        this.ammo = Math.max(this.ammo - 1, 0);
    }

}