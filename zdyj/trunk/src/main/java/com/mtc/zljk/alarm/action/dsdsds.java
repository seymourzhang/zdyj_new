package com.mtc.zljk.alarm.action;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Seymour on 2017/3/9.
 */
public class dsdsds {
    public static void main(String argue){
        List i = new ArrayList();
        i.add(1);
        i.add(12);
        i.add(13);
        i.add(14);
        i.add(15);
        i.add(16);
        i.add(17);
        i.add(18);
        Iterator a = i.iterator();
        a.forEachRemaining(ele->System.out.println(ele));
    }
}
