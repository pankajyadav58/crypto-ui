import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateFormatFilter'
})
export class DateFilterPipe implements PipeTransform {

    transform(date: any): any {
        if (date) {
            date = new Date(date);
            let currentDate = new Date();
            let seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

            let interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
        return date;
    }
}