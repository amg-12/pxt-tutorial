enum Slot {
    Head,
    Chest,
    Legs,
    Feet,
    Mainhand,
    Offhand
}

//% weight=65 color=#A55BA5 icon="\uf06c"
namespace entities {

    // --- Queries ---

    //% block
    //% group=Queries weight=90
    //% target.shadow=minecraftTarget
    export function positionOf(target: TargetSelector): Position {
        let results = mobs.queryTarget(target)
        if (results.length > 0) {
            let entity = results[0]
            return world(Math.floor(entity.x), Math.floor(entity.y), Math.floor(entity.z))
        } else {
            return world(0, 0, 0)
        }
    }

    // -- Selectors --

    //% block blockId=nearestEntity
    //% group=Selectors weight=90
    export function nearestEntity(): TargetSelector {
        let target = mobs.target(ALL_ENTITIES)
        target.addRule("name", "!" + player.name())
        target.addRule("c", "1")
        return target
    }

    //% block="$target=minecraftTarget with tag %tag"
    //% group=Selectors weight=80
    export function targetWithTag(target: TargetSelector, tag: string): TargetSelector {
        target.addRule("tag", tag)
        return target
    }

    //% block="nearest $type=minecraftAnimal"
    //% group=Selectors weight=60
    export function nearest(type: number) {
        let target = mobs.entitiesByType(type)
        target.addRule("c", "1")
        return target
    }

    //% block="$type=minecraftAnimal with tag $tag"
    //% group=Selectors weight=50
    export function tagged(type: number, tag: string) {
        let target = mobs.entitiesByType(type)
        target.addRule("tag", tag)
        return target
    }

    // --- Tagging ---

    //% block="apply tag $tag to $target=minecraftTarget"
    //% group=Tagging weight=90
    export function tag(target: TargetSelector, tag: string) {
        player.execute(`tag ${target} add ${tag}`)
    }

    //% block="remove tag $tag from $target=minecraftTarget"
    //% group=Tagging weight=80
    export function untag(target: TargetSelector, tag: string) {
        player.execute(`tag ${target} remove ${tag}`)
    }

    // --- Equipment ---

    function getSlot(slot: Slot): string {
        switch(slot) {
            case Slot.Head:     return "slot.armor.head"
            case Slot.Chest:    return "slot.armor.chest"
            case Slot.Legs:     return "slot.armor.legs"
            case Slot.Feet:     return "slot.armor.feet"
            case Slot.Mainhand: return "slot.weapon.mainhand"
            case Slot.Offhand:  return "slot.weapon.offhand"
        }
    }

    //% block="put %itemId=minecraftItem on %slot of %target"
    //% group=Equipment weight=90
    //% target.shadow=minecraftTarget
    export function replaceItem(itemId: number, slot: Slot, target: TargetSelector) {
        let itemName = blocks.nameOfBlock(itemId).replaceAll(" ", "_")
        player.execute(`replaceitem entity ${target} ${getSlot(slot)} 1 ${itemName}`)
    }

}
