import { Pipe, PipeTransform } from "@angular/core";
import { UserDetailsGet } from "@common/api-client/models";
import { Role } from "app/common/translators";

@Pipe({name: 'userPermissionsPipe'})
export class UserPermissionsPipe implements PipeTransform {
    transform(value: UserDetailsGet[], role: Role) : UserDetailsGet[] {
        return value.filter(e => e.role == role)
    }
}